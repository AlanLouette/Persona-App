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

## Saved personas and transfer

`persona-storage.js` keeps a library in localStorage. Each persona retains its
answers, avatar, PDF logo, color, section order/deletions, custom sections and
current view/step. Edits save after 300 ms and flush when leaving the page.
“My personas” switches between profiles; “New persona” keeps the previous one.
“Delete” removes only the selected persona after confirmation.

Existing single drafts migrate automatically. Data stays on the same browser
and website; clearing site data deletes it. “Export persona” downloads an editable
JSON file with its images. “Import persona” validates that file and adds a new
profile without overwriting existing profiles. The PDF remains a separate output.
If browser storage is full, the status reports it and JSON export remains available.

## Audience context

`persona-context.js` adapts questions to B2B, B2C or B2B2C. For B2B2C, select
business buyer or end customer. Consumer profiles show purchase budget/context
and hide company size, turnover and reporting hierarchy. Hidden answers are
retained when switching context and are excluded from the PDF. Each walkthrough
step has a short explanation defined in `persona-data.js`.

Run `npm test` for JSON import validation checks.
