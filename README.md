# LSF Water Week — multilingual GitHub Pages

## Website
- `index.html` starts with a language chooser: English, Arabic, French. Selecting a language reveals three options: **Brochure**, **Contact Us**, **Share Your Contact**.
- `contact.html` and `contact-us.html` display the selected language, with a small language switcher on each page.
- Arabic uses right-to-left layout. Brochures are selected by language.
- Country names are displayed using the browser’s built-in language translations when available; the original English country names are retained as values submitted to Sheets.

## Exact file structure
```
index.html
contact.html
contact-us.html
assets/style.css
assets/i18n.js
assets/contact.js
assets/config.js
assets/lsf.png                    (already included)
pdfs/englishbroshure.pdf          (ADD YOUR PDF)
pdfs/arabicbrochure.pdf           (ADD YOUR PDF)
pdfs/frenchbrochure.pdf           (ADD YOUR PDF)
google-sheets/Code.gs
```

## Google Sheets
Your existing deployed Apps Script `/exec` URL is already preserved in `assets/config.js`; **do not replace it with the `/macros/library/` URL**. The form sends the same field names to the same Google Sheets script, so no Apps Script redeployment is needed merely for these website text changes. Keep the Google Sheet private.

A hidden iframe is used for the cross-origin POST; a loaded frame is not proof that a row was saved. After publishing, submit a test and check the **Contacts** tab directly.

## GitHub Pages
Upload the *contents* of this ZIP to the root of your existing `nourinabdelhafiz/LSFWaterWeek` repository. Do **not** upload one enclosing folder. In Settings → Pages, use `main` and `/(root)` and keep Custom domain blank. After the deployment succeeds, visit `https://nourinabdelhafiz.github.io/LSFWaterWeek/`.

All file URLs use relative paths, so the site also works when tested locally.
