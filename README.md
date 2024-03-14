# Feature Documentation Guid

## API documentation `https://soonweareg.com/api/`

### 1. Get Landing Page products
This endpoint provides data on the top 10 products within various categories and banner products for the landing page.
#### Request
`Get /products/landing-page`

#### Example Response
```json
{
    'most-selling' | 'sale' | 'new-arrivals':
    [
        {
            'id': 1,
            'quantity': 3,
            'reviews_count': 15,
            'sold_count': 80,
            'category_id': 1,
            'rating': 4.7,
            'price': 700.00,
            'sale': 15,
            'image': 1-1.png
            'name': 'فستان اسود طويل',
            'description': '',
        },
        .....
    ],
    'banner-products':
    [
        {
            'id': 3,
            'product_id': 12,
            'banner_image': 12-2.jpg,
        },
        .....
    ]
}