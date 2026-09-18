# AstroOracle — website

The public site: landing page, privacy policy and terms. Plain HTML and CSS, no build step —
open `index.html`, or serve the folder:

```bash
python -m http.server 8090
```

| File | What it is |
|---|---|
| `index.html` | Landing page: hero, how it works, app screenshots, features, astrologers, pricing, FAQ |
| `privacy.html` | Privacy policy — Google Play requires a public URL for this |
| `terms.html` | Terms of use, including payments, refunds and what the app will never do |
| `assets/css/styles.css` | The app's saffron palette |
| `assets/img/screen-*.png` | Screenshots taken from the app, trimmed of the Android status bar |

Before launch, search the HTML for `TODO` and fill in: the legal entity name, registered address,
grievance contact, GST treatment, and the support email (currently `hello@astrooracle.app`).
Then have a lawyer read the privacy policy and terms.

Deploying: any static host works. On GitHub Pages, enable Settings → Pages → Deploy from branch
(`main`, `/`).
