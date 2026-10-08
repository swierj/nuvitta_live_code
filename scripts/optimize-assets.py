from pathlib import Path
from PIL import Image, ImageOps

root = Path(__file__).resolve().parents[1]
source = root / 'client/src/assets'
target = root / 'client/public/images'
target.mkdir(parents=True, exist_ok=True)
assets = [('nuvitta-logo.png', 'logo', 400), ('woman-banner-final.png', 'hero', 1600), ('MakeupCleansingOil.png', 'cleansing-oil', 700), ('products_about.jpg', 'products', 1000), ('Ela_About_1.jpg', 'founder', 1000)]
for filename, name, width in assets:
    with Image.open(source / filename) as original:
        image = ImageOps.exif_transpose(original)
        image.thumbnail((width, width))
        image.save(target / f'{name}.webp', 'WEBP', quality=85)
        print(name, image.size, (target / f'{name}.webp').stat().st_size)
