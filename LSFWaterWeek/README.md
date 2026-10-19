# LSF Digital Resources — GitHub Pages

Matches the yellow / gray / dark style of your uploaded LSF page. Works on static GitHub Pages, with Google Sheets submissions handled by a separate Google Apps Script.

## File locations (exact names)

```
index.html                  Main menu with four options
contact.html                Share Your Contact form
contact-us.html             WhatsApp / call / email page
assets/style.css            Site-wide colors and layout
assets/contact.js           Country / calling code and form submission
assets/config.js            PASTE THE GOOGLE APPS SCRIPT /exec URL HERE
assets/lsf.png              ADD YOUR LSF LOGO HERE (rename to lsf.png)
pdfs/englishbroshure.pdf    ADD YOUR ENGLISH BROCHURE HERE (exact spelling)
pdfs/arabicbrochure.pdf     ADD YOUR ARABIC BROCHURE HERE
google-sheets/Code.gs       COPY THIS CODE INTO GOOGLE APPS SCRIPT
```

## Connect the form to Google Sheets

1. Go to [Google Sheets](https://sheets.google.com) and create a **new spreadsheet** (e.g., `LSF Contacts`). Keep it private. Do **not** publish it to the web.
2. In that spreadsheet, select **Extensions → Apps Script**.
3. Delete the example code and paste the full contents of `google-sheets/Code.gs`. Save.
4. Select **Deploy → New deployment → Select type → Web app**.
5. Set **Execute as: Me** and **Who has access: Anyone**. This permits visitors to submit without signing into Google. Approve permissions when prompted.
6. Deploy and copy the **Web app URL** (it must end in `/exec`).
7. Open `assets/config.js` and replace `PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` with the URL between the existing quotes.
8. Upload/push the website files to the root of your GitHub Pages repository. In **Settings → Pages**, configure your publishing branch/folder if necessary.
9. Visit the hosted form, submit test information, and **verify a new row** appeared on the spreadsheet's `Contacts` tab.

For changes to Apps Script, deploy a **new version** through **Deploy → Manage deployments → Edit**. If you get a new URL, update `assets/config.js` too.

**Important:** The browser cannot reliably read the Apps Script's result due to cross-origin restrictions. The form's displayed acknowledgment confirms the iframe received a load, **not** that Sheets saved a row. Confirm with a real test row. If something is wrong, check Apps Script **Executions**, deployment access, and spreadsheet permissions.

## Notes

- Mandatory: name, country, WhatsApp and contact consent. Optional: company, email.
- Selecting a country sets a suggested international dialing prefix; visitors may edit the prefix. The form strips national trunk zeros at the beginning of the local number; test numbers that use significant leading zeros before launching.
- The contact form submits directly to Apps Script over HTTPS. GitHub Pages itself does not store entries.
- Every visitor can access this public submission endpoint. You may need rate limits, CAPTCHA, or server-side bot protection if you attract spam. The simple honeypot is not a security barrier.
- The spreadsheet contains personal contact details: restrict spreadsheet access, share a privacy notice, and manage retention and deletion appropriately.
- Both brochure buttons require you to add the matching PDF files. The logo will appear once you add `assets/lsf.png`.
