# Persona App

Open `persona.html` through a local web server (for example `python3 -m http.server`).

## Structure

- `persona.html`: page shell, sharing links, toolbar and view containers.
- `persona-data.js`: the 26 questions, eight step titles and explanatory copy, defined once.
- `persona-render.js`: builds walkthrough steps and overview cards from those definitions.
- `functions.js`: view transitions, synchronized inputs, avatar uploads, sections and color selection.
- `pdf-export.js`: A4 report layout, circular portrait and pagination.
- `styles.css`: visual design, editor layout and screen-size restriction.
- `default-avatar.svg`: local default portrait.

Visibility uses the HTML `hidden` attribute. Skipping the walkthrough hides it and
shows the overview without removing inputs, preserving answers and uploaded images.
The minimum screen width is handled in CSS, so resizing does not reset the active view.

The app loads jsPDF and Sortable from their CDN. No framework or build step is required.

To edit a question, its placeholder or a step explanation, update `persona-data.js`.
Both views use the same definition, with unique input IDs and matching labels.

## Website integration

Wrap the app in an element with class `persona-app` (the standalone page uses it
on `body`). All CSS selectors are scoped to this class to avoid styling the host
website. The interface uses a dark navy background and subtle violet accents;
the selected persona color is used for the portrait border, export button and PDF.

Layout follows alanlouette.be: 90% width, 1400px maximum, 20px horizontal
padding and Outfit typography. The standalone page loads Outfit from Google Fonts.

## Automatic saving

`persona-storage.js` keeps one draft in localStorage, including answers, uploaded
avatar and PDF logo, selected color, section order/deletions, custom sections and
current view/step. Changes save after 300 ms and flush when leaving the page.
The draft stays on the same browser and origin; it is not uploaded to a server
and does not sync across devices. Clearing browser site data deletes it.
The status indicates storage failures (for example, oversized image uploads).
“New persona” clears the draft after confirmation.
