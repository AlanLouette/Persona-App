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
