This folder should contain the PDF.js distribution files so the site can render PDFs locally without cross-origin issues.

Please download or copy the following files into this folder:

- pdf.min.js
- pdf.worker.min.js

Recommended ways to get them:

1) Using npm (recommended, requires Node.js):

   npm install pdfjs-dist@2
   # then copy files into this folder (example):
   copy node_modules\pdfjs-dist\build\pdf.min.js Static\vendor\pdfjs\pdf.min.js
   copy node_modules\pdfjs-dist\build\pdf.worker.min.js Static\vendor\pdfjs\pdf.worker.min.js

2) Download from CDN (if you prefer):

   - https://unpkg.com/pdfjs-dist/build/pdf.min.js
   - https://unpkg.com/pdfjs-dist/build/pdf.worker.min.js

Place those two files here. After that, open the site via HTTP (e.g. `python -m http.server`) and PDF previews should load in the modal.

If you want, I can download and place these files for you — tell me if you want me to vendor them directly.