# Persona App

Open `persona.html` through a local web server (for example `python3 -m http.server`).

## Structure

- `persona.html`: walkthrough questions, explanatory copy and editable overview.
- `functions.js`: view transitions, synchronized inputs, avatar uploads, sections and color selection.
- `pdf-export.js`: A4 report layout, circular portrait and pagination.
- `styles.css`: visual design, editor layout and screen-size restriction.
- `default-avatar.svg`: local default portrait.

Visibility uses the HTML `hidden` attribute. Skipping the walkthrough hides it and
shows the overview without removing inputs, preserving answers and uploaded images.
The minimum screen width is handled in CSS, so resizing does not reset the active view.

The app loads jsPDF and Sortable from their CDN. No framework or build step is required.
