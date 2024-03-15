# Feature Documentation Guid

## API documentation `https://soonweareg.com/api/`

### 1. Get Landing Page products
This endpoint provides data on the top 10 products within various categories and banner products for the landing page.
#### Request
`Get /products/landing-page`

#### Example Response
```json
{
    'most_selling' | 'on_sale' | 'new_arrivals':
    [
        {
            "id": "18",
            "name": "Syrup - Chocolate",
            "description": "",
            "image_url": products/images/product_{id}.png",
            "price": "£505.59",
            "discount": 15,
            "quantity": 12,
            "rating": 4.6,
            "reviews_count": 3923,
            "sold_count": 61,
            "category_id": "2"
        },
        .....
    ],
    'banners':
    [
        {
            'id': 1,
            'product_id': 12,
            'image_url': products/images/banner_{id}.png,
        },
        .....
    ]
}
```
