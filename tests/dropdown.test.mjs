/**
 * The canvas dropdown (engine dropdown.js, ADR-0009): a press on its button or on an option never takes the focus, so a text field's selection survives a choice.
 * Run on a small stand-in DOM whose events bubble, in both of its branches: the menu as a popover in the dropdown, and the menu placed by measuring in the body.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { engineImport } from './_engine.mjs';

/** An element of the stand-in DOM: children, attributes and listeners, with events that bubble to the parents. */
class Node {
  constructor(tag) {
    this.tagName = tag.toUpperCase();
    this.children = [];
    this.parentNode = null;
    this.listeners = {};
    this.style = { setProperty() {} };
    this.classList = { add() {}, remove() {}, contains: () => false };
    this.attributes = {};
    this.textContent = '';
    this.innerHTML = '';
  }
  addEventListener(type, fn) { (this.listeners[type] ??= []).push(fn); }
  removeEventListener(type, fn) { this.listeners[type] = (this.listeners[type] ?? []).filter((f) => f !== fn); }
  appendChild(child) { child.parentNode = this; this.children.push(child); return child; }
  append(...children) { for (const child of children) if (typeof child === 'object') this.appendChild(child); }
  replaceChildren() { this.children = []; }
  setAttribute(name, value) { this.attributes[name] = String(value); }
  remove() { if (this.parentNode) this.parentNode.children = this.parentNode.children.filter((c) => c !== this); this.parentNode = null; }
  contains(node) { for (let n = node; n; n = n.parentNode) if (n === this) return true; return false; }
  getBoundingClientRect() { return { left: 10, top: 10, right: 110, bottom: 30, width: 100, height: 20 }; }
  hidePopover() {}
}

/** Fires an event at a node and every parent above it; returns the event. */
function fire(node, type, extra = {}) {
  const event = { type, target: node, defaultPrevented: false, preventDefault() { this.defaultPrevented = true; }, ...extra };
  for (let n = node; n; n = n.parentNode) for (const fn of n.listeners[type] ?? []) fn(event);
  return event;
}

/** Runs `fn` with the stand-in DOM as the page, and the popover API and anchor positioning present or not. */
async function withPage(popover, fn) {
  const body = new Node('body');
  const page = { createElement: (tag) => new Node(tag), getElementById: () => null, head: new Node('head'), body, addEventListener() {}, removeEventListener() {} };
  class HTMLElement {}
  if (popover) Object.assign(HTMLElement.prototype, { popover: null, showPopover() {} });
  const globals = { document: page, window: { innerWidth: 1200, innerHeight: 800 }, HTMLElement, CSS: { supports: () => popover } };
  const kept = Object.keys(globals).map((name) => [name, Object.getOwnPropertyDescriptor(globalThis, name)]);
  for (const [name, value] of Object.entries(globals)) Object.defineProperty(globalThis, name, { configurable: true, writable: true, value });
  try {
    await fn(body);
  } finally {
    for (const [name, descriptor] of kept) {
      if (descriptor) Object.defineProperty(globalThis, name, descriptor);
      else delete globalThis[name];
    }
  }
}

const OPTIONS = [['p', 'Paragraph'], ['h2', 'Heading 2'], ['h3', 'Heading 3']];
const { createDropdown, closeDropdowns } = await engineImport('dropdown.js');

test('the menu as a popover in the dropdown: a press on the button or an option keeps the focus where it was, and a click still chooses', async () => {
  await withPage(true, async () => {
    const chosen = [];
    const dd = createDropdown({ value: 'p', options: OPTIONS, onchange: (v) => chosen.push(v) });
    const [btn, menu] = dd.el.children;
    assert.equal(menu.popover, 'auto', 'this branch draws the menu as a popover');
    fire(menu, 'toggle', { newState: 'open' });
    assert.equal(menu.children.length, OPTIONS.length);
    assert.equal(fire(btn, 'mousedown').defaultPrevented, true, 'the button');
    for (const option of menu.children) assert.equal(fire(option, 'mousedown').defaultPrevented, true, 'an option');
    fire(menu.children[1], 'click');
    assert.deepEqual(chosen, ['h2']);
    fire(menu, 'toggle', { newState: 'closed' });
  });
});

test('the menu placed by measuring in the body: a press on the button or an option keeps the focus where it was, and a click still chooses', async () => {
  await withPage(false, async (body) => {
    const chosen = [];
    const dd = createDropdown({ value: 'p', options: OPTIONS, onchange: (v) => chosen.push(v) });
    const [btn] = dd.el.children;
    assert.equal(dd.el.children.length, 1, 'this branch keeps no menu in the dropdown');
    assert.equal(fire(btn, 'mousedown').defaultPrevented, true, 'the button');
    fire(btn, 'click');
    // The menu listens for a press outside it from the next turn.
    await new Promise((resolve) => setTimeout(resolve, 0));
    const menu = body.children.at(-1);
    assert.ok(menu && !dd.el.contains(menu), 'the menu stands in the body, outside the dropdown');
    assert.equal(menu.children.length, OPTIONS.length);
    for (const option of menu.children) assert.equal(fire(option, 'mousedown').defaultPrevented, true, 'an option');
    fire(menu.children[2], 'click');
    assert.deepEqual(chosen, ['h3']);
    closeDropdowns();
  });
});
