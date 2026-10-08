# AstroOracle — website

The public site at astrooracle.in: the landing page in English and Hindi, the privacy policy and
terms, and the pages that open shared invite and match links. Plain HTML, CSS and a few lines of
JavaScript, no build step. Open `index.html`, or serve the folder:

```bash
python -m http.server 8090
```

| File | What it is |
|---|---|
| `index.html` | Landing page in English: hero with a live answer, the 75-second tour (YouTube), features, what is free, FAQ |
| `hi/index.html` | The same page in Hindi, with the Hindi app screens and the Hindi tour |
| `privacy.html` | Privacy policy — Google Play requires a public URL for this |
| `terms.html` | Terms of use, including payments, refunds and what the app will never do |
| `i/` and `m/` | Landing pages for invite codes (`/i/?c=CODE`) and shared Kundli matches (`/m/?c=CODE`) |
| `assets/css/styles.css` | The design system: night bands, saffron morning, phone frames |
| `assets/js/site.js` | The nav over the dark bands, scroll reveals, the hero loop, and the tour's YouTube player |
| `assets/img/app/<lang>/` | App screens, recorded on a phone from a demo account |
| `assets/video/` | The hero loops (`hero-<lang>.mp4` with `.webp` posters) and the tour posters |
| `assets/img/og-<lang>.jpg` | Link-preview images for WhatsApp, X and Facebook |
| `sitemap.xml`, `robots.txt` | For search engines; both pages declare each other with `hreflang` |

The tours play from YouTube (English https://youtu.be/D5aAJFaA_RM, Hindi
https://youtu.be/esEpM1mxAIw): the page shows its own poster and loads YouTube's player, on the
privacy-enhanced youtube-nocookie.com domain, only when someone presses play. The app screens,
loops, posters and preview images are generated from the recordings in the app repo:
`python marketing/video/web_assets.py`. Every store button links to
`https://play.google.com/store/apps/details?id=com.astrooracle.avokara`.

Before launch, search the HTML for `TODO` and fill in the legal entity name, registered address
and grievance contact. Then have a lawyer read the privacy policy and terms.

Deploying: GitHub Pages serves `main` from the root (`CNAME` holds the domain). A push to `main`
is live within a minute or two.
