[![forthebadge](https://forthebadge.com/images/badges/powered-by-coffee.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/does-not-contain-msg.svg)](https://forthebadge.com)

# Woolworths API
"We are the fresh food people, supporting farmers!" and now a [node.js](http://npmjs.com/package/woolies) API!

### Official Documentation:
Our documentation has been released to our [GitHub](https://github.com/tascord/Woolies/blob/main/docs/Commands.md) showing how to use the package.

### Installation:
- Ensure you have [NodeJS](https://nodejs.org/) installed on your computer.
- To use the Woolworths API run `npm i woolies` in your directory.
```js
const Woolworths = require('woolies'); // Require the API in your document
```

### Example:


##### Code:
```js

Woolworths.Search('Foundation Soy & Honey Sauce')
  .then(console.log);

```
##### Response:

```jsonc
{
    "success": true,
    "data": {
        "products": [
            {
                "name": "Fountain Soy & Honey Sauce",
                "description": " Fountain Soy & Honey Sauce 250ml",
                "code": 757750,
                "price": 2.7,
                "brand": "fountain",
                "thumbnails": {
                    "small": "https://cdn0.woolworths.media/content/wowproductimages/small/757750.jpg",
                    "medium": "https://cdn0.woolworths.media/content/wowproductimages/medium/757750.jpg",
                    "large": "https://cdn0.woolworths.media/content/wowproductimages/large/757750.jpg"
                },
                "on_special": false,
                "in_stock": true,
                "package_size": "250ml",
                "ratings": {
                    "count": 0,
                    "value": "0.00"
                },
                "ingredients": [
                    "Water",
                    "Sugar Syrup",
                    "Hydrolysed Vegetable Protein (Soybeans 1.5%, Maize)",
                    "Honey (8%)",
                    "Salt Colour (150d)",
                    "White Vinegar",
                    "Rehydrated Garlic",
                    "Thickener (1422)"
                ],
                "raw": {
                    // . . .
                }
            }
        ]
    }
}
```

### Support:
To receive support or ask for help relative to the Woolworths API join [CactiveNetwork](https://discord.gg/NeqVuSy) for support and run `-ticket open`. 

### Random quote from Woolworths, the fresh food people;
> "We are on a mission to deliver the best in convenience, value and quality for our customers. We employ over 200,000 team members who serve over 29 million customers across our brands every week. We are a trusted business partner to thousands of local farmers and manufacturers."
