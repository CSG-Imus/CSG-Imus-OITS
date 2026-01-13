# CSG-Imus-OITS — Transparency Site (Static)

Minimal static transparency portal for the Central Student Government — Imus Campus.

This repository is a small client-side static site (HTML, CSS, vanilla JS). Content is driven by arrays in `Static/main.js` so the site can be updated by editing those data structures and adding files to the project folders.

It now also includes a searchable multi-event gallery, document filter improvements, and a refreshed hero description.

## Structure
- `index.html` — single-page markup and modal scaffolding (now highlights the Event Gallery feature and includes the gallery search control).
- `Static/main.css` — styles, responsive rules, and layout (covers hero tweaks, event gallery cards, placeholders, and search input alignment).
- `Static/main.js` — data and client-side app logic: rendering lists, modal preview, hero slider, About carousel, searches, multi-event gallery population, and full document filtering.
- `Static/vendor/pdfjs/` — (optional) place `pdf.min.js` and `pdf.worker.min.js` here if you want client-side PDF rendering without the browser viewer toolbar.
- `Dashboard-Photos/` — images used by the About carousel and home hero slider.
- `files/` — example documents (PDFs) referenced by data items.
- `Event Gallery Materials/` — per-event folders for the gallery (Foundation Week, Pande Kape, Paskuhan, SLTP, etc.).

## Editing content
- Documents and officers live in `Static/main.js` as the `data` object. Each document entry should include:
	- `id` (string), `title` (string), `date` (YYYY-MM-DD) and `file` (path or URL).
- Officers are in `data.officers` (executives, boardMembers, last). Edit or replace entries as needed.
- Images for the About slider / Hero use `Dashboard-Photos/*.png`. Add or replace PNGs there.
- Event Gallery photos live in `Event Gallery Materials/<event name>/`. Add filenames to `eventGallerySets` in `Static/main.js` to expose them.

## Appearance and assets
- The site uses a single font-family set in `Static/main.css` (Arial, with fallbacks).
- Accent color: change `--accent` in `Static/main.css`.
- Hero card copy and quick link layout are defined in `index.html` / `Static/main.css`.

## Modal document previews and PDF.js
- Documents open in a modal. By default the modal uses an `<iframe>` fallback which shows the browser's PDF UI.
- If you want toolbar-free PDF rendering (the site renders the first page onto a `<canvas>`), vendor `pdf.min.js` and `pdf.worker.min.js` from Mozilla's PDF.js into `Static/vendor/pdfjs/`.
	- Place `pdf.min.js` at `Static/vendor/pdfjs/pdf.min.js` and `pdf.worker.min.js` at `Static/vendor/pdfjs/pdf.worker.min.js`.
	- Serving the site over HTTP (not `file://`) is recommended so the worker can be loaded without cross-origin issues.
	- PDF zoom controls live inside the modal actions toolbar.

## Local testing
Serve the project folder over a local HTTP server (PowerShell example):

```powershell
Set-Location 'd:\Documents\Static Website\CSG-Imus OITS'
python -m http.server 8000; Start-Process 'http://localhost:8000'
```

Notes:
- The PDF canvas renderer requires the vendor files and a working local server.
- Document search is client-side and filters entries by `id` & `title`.
- Event Gallery search filters event cards by title.

## Customization and development
- Hero slider images are taken from `Dashboard-Photos` and auto-cycle; update the `dashboardPhotos` array in `Static/main.js` to change the set or order.
- About text is in `index.html` inside the About section; emphasis is marked with `<strong>` tags.
- Styles are in `Static/main.css`; update variables at the top (`--accent`, `--bg`, etc.) to match branding.
- Event gallery configuration (titles, folders, filenames) lives in `eventGallerySets` inside `Static/main.js`.
- Document filter behavior defaults to “Recent” (top 3 per type). Choosing a specific type renders the full list until you revert to “Recent”.

## Accessibility
- Buttons and links are keyboard-focusable. Modals use `aria-modal` and a visible close control.

## License & credits
This project is provided for the CSG-Imus community. Use and modify freely for campus needs.

If you want, I can also:
- Add a small script to copy the fetched PDF.js files into `Static/vendor/pdfjs/` for you (I already fetched them earlier), or
- Tweak fonts/heading sizes to better suit Arial across devices, or
- Help populate the Event Gallery folders with actual images and update `eventGallerySets` accordingly.