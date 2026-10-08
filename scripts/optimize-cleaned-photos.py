"""Encode cleaned PNG masters as lossless WebP for the storefront."""
from pathlib import Path
from PIL import Image

folder = Path(__file__).resolve().parents[1] / 'client/public/images/catalog'
sources = sorted(folder.glob('*_cdx.png'))
if len(sources) != 28:
    raise RuntimeError(f'Expected 28 cleaned masters, found {len(sources)}')
for source in sources:
    target = source.with_suffix('.webp')
    with Image.open(source) as image:
        image.save(target, 'WEBP', lossless=True, method=6)
    print(f'{target.name}: {target.stat().st_size} bytes')
