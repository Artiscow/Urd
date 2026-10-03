/**
 * The meeting links (meeting-links.js): the services known by their host,
 * the hosts a site adds for its own server, and the host a button shows.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

const { MEETING_HOSTS, meetingHostList, isMeetingHost, isMeetingLink, linkHost, meetingLinkIn } = await engineImport('meeting-links.js');
const { meetingLinkOf, eventJsonLd } = await engineImport('ics.js');

test('meetingHostList: hosts from hosts and whole addresses, lower case, without repeats', () => {
  assert.deepEqual(meetingHostList(['Meet.Example.org', 'https://talk.example.org/call/abc', 'meet.example.org']), ['meet.example.org', 'talk.example.org']);
  assert.deepEqual(meetingHostList('meet.example.org, talk.example.org\nbbb.example.org'), ['meet.example.org', 'talk.example.org', 'bbb.example.org']);
  // A word without a dot, an address literal with a scheme that is no host, and nothing at all are left out.
  assert.deepEqual(meetingHostList(['localhost', 'not a host', '', null, 'javascript:alert(1)']), []);
  assert.deepEqual(meetingHostList(undefined), []);
});

test('isMeetingHost and isMeetingLink: the host exactly or a subdomain of it, never a substring', () => {
  for (const host of ['zoom.us', 'us02web.zoom.us', 'meet.proton.me', 'kmeet.infomaniak.com', 'call.element.io', 'meet.jit.si']) assert.ok(isMeetingHost(host), host);
  assert.ok(!isMeetingHost('notzoom.us'));
  assert.ok(!isMeetingHost('zoom.us.example.com'));
  assert.ok(!isMeetingHost('talk.example.org'));
  assert.ok(isMeetingHost('talk.example.org', ['talk.example.org']));
  assert.ok(isMeetingHost('a.talk.example.org', ['talk.example.org']));
  assert.ok(isMeetingLink('https://meet.proton.me/join/id-abc#pwd-123'));
  assert.ok(!isMeetingLink('https://example.org/meet.proton.me/join'));
  assert.ok(!isMeetingLink('not an address'));
  assert.ok(MEETING_HOSTS.every((host) => meetingHostList([host]).length === 1));
});

test('linkHost: the host a button leads to, for http addresses only', () => {
  assert.equal(linkHost('https://meet.proton.me/join/id-abc#pwd-123'), 'meet.proton.me');
  assert.equal(linkHost('http://a.example.org:8080/x'), 'a.example.org');
  assert.equal(linkHost('mailto:a@example.org'), '');
  assert.equal(linkHost('javascript:alert(1)'), '');
  assert.equal(linkHost(''), '');
});

test('meetingLinkIn and meetingLinkOf: a known service, the site own host, and the feed own field first', () => {
  assert.equal(meetingLinkIn(['Rom 2', 'Join: https://meet.proton.me/join/id-abc#pwd-123.']), 'https://meet.proton.me/join/id-abc#pwd-123');
  assert.equal(meetingLinkIn(['See https://talk.example.org/call/abc']), null);
  assert.equal(meetingLinkIn(['See https://talk.example.org/call/abc'], ['talk.example.org']), 'https://talk.example.org/call/abc');
  const occ = { description: 'See https://talk.example.org/call/abc' };
  assert.equal(meetingLinkOf(occ), null);
  assert.equal(meetingLinkOf(occ, ['talk.example.org']), 'https://talk.example.org/call/abc');
  assert.equal(meetingLinkOf({ ...occ, meeting: 'https://video.example.org/r/1' }, ['talk.example.org']), 'https://video.example.org/r/1');
  // The structured data follows the site's own hosts.
  const data = eventJsonLd({ ...occ, title: 'Board', start: Date.UTC(2026, 9, 5, 16) }, { meetingHosts: ['talk.example.org'] });
  assert.equal(data.eventAttendanceMode, 'https://schema.org/OnlineEventAttendanceMode');
});
