# Original catalog restored — October 7, 2026

Source: https://swierj.github.io/nuvitta_api_test/product-data.json
Local source snapshot: shared/original-catalog.json

Restored 27 individual products, four bundles, original integer-cent prices, sizes, categories, bestseller flags, descriptions, superstar ingredients, highlights, directions, full ingredients, key features, skin-type guidance, warnings, and eight historical reviews. The original AboutStore paragraphs and public phone/email are restored too. Homepage now shows the original bestseller selection and all four bundles.

The migration script preserves wording and source fields, generates stable name-based URLs, links bundle membership, and downloads optimized local product photographs. The 31 optimized catalog images total approximately 704 kB. Historical numeric product links remain supported by the storefront; the initial /products/cleansing-oil link resolves to Makeup Cleansing Oil at the original $27 price.

Original source gaps: all four bundle descriptions are blank. Three bundle images point to Vitamin C Serum; those cards/details instead display the actual included-product photographs together. Original mission/vision/background paragraphs were Lorem Ipsum and the return-policy section was only a heading; these unfinished placeholders have not been presented as finished content. Existing static reviews are labeled as imported catalog reviews.

Validation: all five API/cart/migration tests pass; the migration check compares each entry with its original wording/prices/details and verifies image files and bundle membership. Production build passes. Browser review covered 31-item listing, original ingredient disclosure, the five-item bundle, and the full catalog/long product copy at 390 px mobile width. Checkout remains disabled.
