---
layout: post
title: "Commands"
date: 2020-01-05 00:00:00 -0400
categories: v1.0
---

# Commands

## Contents

- [Search](#search) - Search for an item in the Woolworths store.

## Search

Search for an item in the Woolworths store.

**Parameters:**

- ``item``: _String_ - Item name (Required)

**Example:**

```js
Woolworths.Search('Foundation Soy & Honey Sauce')
  .then(console.log);
```

**Response:**

```js
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
