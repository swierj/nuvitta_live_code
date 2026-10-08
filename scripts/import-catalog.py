"""Import the original NuVitta catalog snapshot and optimize its product photos."""
import json
import re
import unicodedata
from concurrent.futures import ThreadPoolExecutor
from io import BytesIO
from pathlib import Path
from urllib.request import urlopen
from PIL import Image, ImageOps

root = Path(__file__).resolve().parents[1]
source = json.loads((root / 'shared/original-catalog.json').read_text(encoding='utf-8-sig'))
target = root / 'client/public/images/catalog'
target.mkdir(parents=True, exist_ok=True)

def slug(name):
    text = unicodedata.normalize('NFKD', name).encode('ascii', 'ignore').decode().lower()
    return re.sub(r'[^a-z0-9]+', '-', text).strip('-')

ids = {item['name']: slug(item['name']) for item in source}

def photo(item):
    dest = target / f"{ids[item['name']]}.webp"
    if dest.exists():
        return
    with urlopen(item['imgMain'], timeout=60) as response:
        with Image.open(BytesIO(response.read())) as original:
            image = ImageOps.exif_transpose(original)
            image.thumbnail((900, 900))
            image.save(dest, 'WEBP', quality=85)
    print(f"Imported {item['name']}", flush=True)

with ThreadPoolExecutor(max_workers=6) as pool:
    list(pool.map(photo, source))

catalog = []
for item in source:
    product = {key: value for key, value in item.items() if key != 'price_id'}
    product.update(
        id=ids[item['name']],
        legacyId=item['id'],
        image=f"/images/catalog/{ids[item['name']]}.webp",
        imageAlt=item['name'],
        description=item.get('prodDesc', item.get('description', '')),
        size=item.get('size', ''),
    )
    if item['bundle']:
        product['items'] = [ids[name] for name in item['includedProducts']]
        product['size'] = f"{len(product['items'])} products"
        product['showContentsImage'] = item['id'] in [29, 30, 31]
    catalog.append(product)
(root / 'shared/catalog.json').write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f"Imported {len(catalog)} entries; original wording and integer-cent prices preserved.")
