"""Stamp the stylesheet and script links with a hash of their contents.

GitHub Pages lets browsers keep CSS and JS for four hours but HTML for only ten minutes, so after
an edit a visitor can get the new page with the old stylesheet. A changed ?v= makes the browser
fetch the new file. Run after editing assets/css/styles.css or assets/js/site.js:

    python tools/version-assets.py
"""

import hashlib
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ASSETS = {"assets/css/styles.css": "styles\\.css", "assets/js/site.js": "site\\.js"}

stamps = {name: hashlib.md5((ROOT / name).read_bytes()).hexdigest()[:8] for name in ASSETS}
for page in sorted(ROOT.glob("**/*.html")):
    text = page.read_text(encoding="utf-8")
    updated = text
    for name, pattern in ASSETS.items():
        updated = re.sub(rf'({pattern})(\?v=[0-9a-f]+)?"', rf'\1?v={stamps[name]}"', updated)
    if updated != text:
        page.write_text(updated, encoding="utf-8")
        print("updated", page.relative_to(ROOT))
print(", ".join(f"{name} v={stamp}" for name, stamp in stamps.items()))
