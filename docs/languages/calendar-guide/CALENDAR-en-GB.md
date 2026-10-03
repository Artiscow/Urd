# The calendar

[Norsk (bokmål)](CALENDAR-nb.md)

The canonical text (ADR-0022): on a discrepancy this English text applies. The button and panel names below are the English admin texts; if your admin is set to another language, the names follow that language.

For you who own or edit a site built with Urd and want to show events on it. The **Calendar** block shows a calendar you keep somewhere else, in the calendar app you already use. You add and change events there, and the site follows by itself. Nothing is stored in Urd.

This guide covers what the calendar can do today. The general use of the editor is in the [user guide](../user-guide/GUIDE-en-GB.md).

**Contents:** [How it works](#how-it-works) · [Calendar services](#calendar-services) · [Adding your calendar](#adding-your-calendar) · [What is read from an event](#what-is-read-from-an-event) · [Meeting links](#meeting-links) · [Sign-up](#sign-up) · [Places and maps](#places-and-maps) · [Finding events](#finding-events) · [Times](#times) · [The event card](#the-event-card) · [Search engines](#search-engines) · [Phone, keyboard and print](#phone-keyboard-and-print) · [Privacy](#privacy) · [What the calendar cannot do](#what-the-calendar-cannot-do)

## How it works

Every calendar service can give a calendar an address that other programs can read, called an **iCal address** (it often ends in `.ics`, or starts with `webcal://`). You paste that address into the Calendar block, and the block reads the calendar every time the page is shown.

Two things follow from this:

- **The calendar must be public.** The site reads it without logging in, so anyone with the address can read it too. Keep a calendar of its own for what the site shows, apart from your private one.
- **A change takes a little while to show.** The site keeps what it read for about ten minutes, and some services update their iCal address only a few times a day.

## Calendar services

The calendar needs a service that can give a public iCal address. «Tested» means the service has been used with Urd; the others give a standard iCal address and are expected to work the same way.

| Service | Who makes it | Price | Public iCal address | Tested |
|---|---|---|---|---|
| Google Calendar | Google, United States | free | yes | yes |
| Proton Calendar | Proton, Switzerland | free with one calendar; sharing and more calendars on the paid plans | yes | no |
| Fastmail | Fastmail, Australia | paid | yes | no |
| Nextcloud Calendar | open source, on a server of your own or a rented one | the software is free | yes | no |
| iCloud Calendar | Apple, United States | free with an Apple account | yes | no |
| Outlook | Microsoft, United States | free and paid | yes | no |
| Teamup | Teamup, Switzerland | free and paid | yes | no |
| Tuta Calendar | Tuta, Germany | free | **no** | |
| Spond | Spond, Norway | free | **no** | |

**Tuta Calendar** cannot share a calendar outside Tuta, because everything in it is encrypted for its own users only. **Spond** has no public address for a group's events; it only syncs them to the calendar on your own phone. Neither can be shown by the Calendar block today.

Where to find the address:

- **Google Calendar:** Settings, the calendar under «Settings for my calendars», «Access permissions for events»: tick «Make available to public». Then «Integrate calendar»: copy «Public address in iCal format». You may also paste only the calendar id (it looks like an e-mail address).
- **Proton Calendar:** Settings, All settings, Calendars, «Share with anyone», «Create link». Choose the full view, so titles and descriptions are included.
- **Fastmail:** Settings, Calendars, «Edit & share» on the calendar, «Publish», «Full event details».
- **Nextcloud Calendar:** the pencil beside the calendar, «Share link», copy the link and paste it as it is. The calendar block turns the link into the address of the calendar's iCal file by itself.
- **iCloud Calendar:** share the calendar and turn on «Public Calendar»; copy the link (it starts with `webcal://`).
- **Outlook:** Settings, Calendar, Shared calendars, «Publish a calendar»; copy the ICS link.
- **Teamup:** the calendar's iCalendar feeds.

## Adding your calendar

1. Open the **Blocks** panel and add a **Calendar** block (or the section template «What is on»).
2. Select the block. In its menu, under **Sources**, paste the iCal address, one per line.
3. Choose the design under **Design**, and how many events are shown.

Until a source is pasted, the block shows sample events in the editor, so you can see the design. Visitors never see the sample events.

**Several calendars** can stand in one block. They are shown as one calendar, and an event that stands in two of them is shown once. Give each a **Name** and a colour: the name becomes the events' category, and the colour marks them.

## What is read from an event

| In your calendar app | On the site |
|---|---|
| Title | the event's title |
| Start and end | the time, written with its end («18:00-21:00») |
| All day, or several days | «all day», or «until 6 Oct» |
| Place | the place, as a link to a map |
| Description | the description, with its addresses as links |
| A repeating event | every occurrence, marked as repeating |
| A cancelled event | a struck title and «Cancelled», unless you hide them |
| A picture attached by address, or a link to a picture in the description | the event's picture |
| Categories | the event's category |

**Repeating events** are read with the common rules: every day, week, month or year, on given weekdays, «the second Tuesday», «the last Thursday of the month», in given months only, with single dates added or taken away, and with single occurrences moved or changed.

**Categories** come from the first of these that exists: the name you gave the calendar under Sources, the category the event has in your calendar app, or a title written as «Category: Title» («Meeting: AGM» has the category «Meeting» and the title «AGM»).

**Pictures** are fetched by the site itself and handed to the page, from hosts the site has been set up to allow. A picture from a host that is not allowed is left out; the set-up is described in [Pictures from a shared folder](../setup-photos/PHOTOS-en-GB.md) (the variable `PHOTO_HOSTS`).

**A formatted description** (bold, lists, links) is shown with its paragraphs, line breaks, lists, bold, italic, underline, quotes and links. Everything else in it, such as pictures, colours, forms and embedded content, is left out. A calendar is written by someone outside the site, so only what is known to be harmless is drawn.

## Meeting links

An event with a video meeting gets a **Join** button in its card.

The link is found in two ways:

- **The field your calendar app writes it in.** Google Calendar and Outlook put the meeting link in a field of their own when you add a meeting to an event.
- **A link in the event's address, place or description** to a service the calendar knows: Zoom, Microsoft Teams, Google Meet, Whereby, Webex, Proton Meet, kMeet (Infomaniak), Element Call and Jitsi on `meet.jit.si`.

**A server of your own** (Jitsi, Nextcloud Talk, BigBlueButton and the like) has an address only you know. Add it in the **Site** panel under **Own meeting addresses**, for example `meet.example.org`, with commas between several. A link to that address in an event then gives the Join button too.

The button shows where it leads when the pointer rests on it («meet.proton.me»), so a visitor can see the address before pressing. A link counts as a meeting link only when its address is exactly a known one, never because the name appears somewhere in a longer address.

## Sign-up

With **Show «Sign up» buttons** on, an event with a sign-up link gets a **Sign up** button in the list and in its card. The switch is off on a new calendar.

The sign-up link is the first of these that exists:

1. **A link on a line of the description that speaks of signing up,** registering or tickets, for example «Sign up: https://example.org/form» or «Tickets: https://example.org/tickets».
2. **The event's own address,** which event services such as Eventbrite, Luma and Mobilizon fill in with the event's page.

A link that merely stands in the description is not a sign-up; it stays a link in the text. A link to a picture or to a video meeting is never the sign-up.

The button leads to the page the organiser has chosen. The calendar itself takes no sign-ups, see [What the calendar cannot do](#what-the-calendar-cannot-do).

## Places and maps

The place of an event is a link to a map. Which map is your choice, in the **Site** panel under **Map service**. Each choice in the list says who makes the service, where they are from and what it does with a visitor's search.

| Service | Finds a venue by its name | Covers |
|---|---|---|
| OpenStreetMap (the default) | sometimes | the world |
| DuckDuckGo Maps | yes | the world |
| Brave Maps | yes | the world |
| HERE WeGo | yes | the world |
| Google Maps | yes | the world |
| Apple Maps | yes | the world |
| Norgeskart | no | Norway |
| FINN kart | yes | Norway |

It is a link only: nothing is loaded from the map service until a visitor presses the place.

**Pick the place from your calendar app's own search when it has one.** Google Calendar, Apple Calendar and Outlook suggest places as you type in the place field. Choose one of the suggestions, and the app fills in the venue's name and its full address. You need to do nothing more.

**Write the address by hand only when the app has no such search.** Then write the venue's name first and the address after it, with commas between: «The hall, Storgata 1, 7011 Trondheim».

Why the form matters:

- A map service that knows venues by name (see the table) is given the whole text.
- A map service that knows addresses only is given the address without the name in front, since the name would make its search fail.
- A place written as a name alone («The clubhouse») has no address, and no map can find it.

**Coordinates.** When your calendar app stores a point for the place, OpenStreetMap and Apple Maps open that exact point, which no search can miss.

## Finding events

Four tools help a visitor find an event. All are switches in the block's menu, and all are off on a new calendar:

- **Show category filter:** a button per category.
- **Show place filter:** a button per venue. The venue is the place up to its first comma, so «The hall, Storgata 1» is «The hall». The buttons appear when the events have two or more venues.
- **Show search field:** the visitor types, and only the events with those words in their title, place or description are left.
- **Show earlier events:** the events of the last 90 days that are over, folded under «Earlier» with their count. It is offered in the designs that count out what is coming, not in a month, week, day or year.

The tools work together: a search inside one venue, in one category.

**Show view switcher** lets the visitor change between what is coming, the week and the month.

## Times

- **Time zone** (the **Site** panel): the clock every visitor sees the times on, for example `Europe/Oslo`. Without it, each visitor sees the times in their own time zone. A visitor in another zone is told which zone the times are in.
- **Clock** (the block): 24 hours, or 12 hours with am and pm. 24 hours is the default in every language.
- **The week starts** (the block): Monday or Sunday, or «Auto» for what the site's language uses.

## The event card

A press on an event opens its card over the calendar: the date and time, the place, the picture, the whole description, and the Join and Sign up buttons. The page can be scrolled as usual, and Escape, the close button or a press outside the card closes it.

**Add to calendar** in the card gives the visitor the event in their own calendar: to Google Calendar, or as a file for Apple Calendar, Outlook and the others. It also offers the whole calendar as a subscription.

**Show subscribe button** puts a **Subscribe** button under the calendar, so visitors can follow the whole calendar in their own app.

## Search engines

With **Tell search engines about the events** on (it is on unless you switch it off), the published page describes the events the calendar shows in a form search engines read: the name, the time, the place, a meeting link, and whether the event is cancelled. A search engine can then show an event with its date and place. Whether it does is up to the search engine.

Give every event a place with an address. An event without one is the kind search engines leave out most often.

## Phone, keyboard and print

- **On a phone** the designs with seven columns change: the days of a week stand under each other, and in a month every day is a button with a dot per event; a press lists that day's events.
- **With a keyboard** a month or a week is one stop for the Tab key. The arrow keys move between the days, Home and End go to the ends of the week, and PageUp and PageDown change the month or the week. Enter opens an event.
- **On paper** the design and the buttons are left out, and the events are printed as a plain list.

## Privacy

- **The visitor's browser never contacts your calendar service.** The site fetches the calendar itself and hands it to the page, and the events' pictures the same way.
- **A map, a meeting or a sign-up page is contacted only when the visitor presses its link.**
- **What is in a public calendar is public.** Do not put names, phone numbers or private notes in the events of a calendar the site shows.

## What the calendar cannot do

The block shows a calendar kept somewhere else, so three things are out of its reach:

- **Sign-up with a number of places and a waiting list.** Use a form or an event service, and put its link in the event.
- **Ticket sales.** The same: link to the service that sells them.
- **A map with all events on it.**

A calendar that needs a login cannot be shown either.
