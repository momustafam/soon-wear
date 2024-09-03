# Django E-commerce Inventory Management App

This application is designed to:<br> 
  - Help staff members who are working on the soon wear web application to efficiently manage the website product inventory using an admin panel.
  - Allow soon wear front-end developers to access the needed data via APIs endpoints
  

## Features

- Add, update, and delete products
- Add, update, and delete banners
- Track quantities, prices, discounts, rating, and number of reviews of each product
- Categorize products for easy organization


## Database Design

Note!!! This diagram is for SQL implementation on MySQL DBMS, Django ORM has its syntax to imlement the same diagram.<br><br>
![](./ERD.png)

## API Documentation Guide

The Inventory API allows users to manage products, categories, and inventory for an e-commerce platform.

## Overview

The Inventory API allows soon wear front-end developers to fetch or upload needed data.<br><br>

Base URL --> `http://{localIPAdress}:8000/api/v1/` <br><br>

### Endpoints:

#### landing-page

- URL: */landingpage
- Allow: GET, HEAD, OPTIONS
- Description: Retrieve banners and products data of the landing page.
- Authentication: Not Required
- Request Parameters: None
- Response:
```json
{
    "banners": {
        "main_banner_dynamic": [
            {
                "image": "/banners/banner_1_aQuYD7y.jpg",
                "url": null
            },
            {
                "image": "/banners/banner_2_DIal7Qe.jpg",
                "url": null
            },
            {
                "image": "/banners/banner_3_HZqZPFo.jpg",
                "url": null
            }
        ],
        "main_banner_static": [
            {
                "image": "/banners/add1.jpg",
                "url": null
            },
            {
                "image": "/banners/add2.jpg",
                "url": null
            },
            {
                "image": "/banners/add3.jpg",
                "url": null
            },
            {
                "image": "/banners/adds1.jpg",
                "url": null
            },
            {
                "image": "/banners/adds2.jpg",
                "url": null
            },
            {
                "image": "/banners/adds3.jpg",
                "url": null
            }
        ],
        "top_selling_banner": [
            {
                "image": "/banners/banner_3.jpg",
                "url": null
            }
        ],
        "recently_arrived_banner": [
            {
                "image": "/banners/banner_2.jpg",
                "url": null
            }
        ],
        "customer_review": [
            {
                "image": "/banners/customers_reviews1.jpg",
                "url": null
            },
            {
                "image": "/banners/customers_reviews2.jpg",
                "url": null
            },
            {
                "image": "/banners/customers_reviews3.jpg",
                "url": null
            }
        ]
    },
    "top_discounts": [
        {
            "id": 1,
            "name": "ملحفة سوون",
            "description": "قطعة قطن 100% معالجة ضد أي انكماش ،وكمان مميزة جدا وهتناسب معاكي لأي خروجة، وتعملي ليها استايلنج بكذا شكل مُختلف.😍❤️",
            "feature": "top_discounts",
            "price": 650,
            "discount": 70,
            "rating": "0.0",
            "reviews_count": 0,
            "main_img": "products/product_6.jpg",
            "category_id": 1,
            "stocks": {
                "من 60 ل 80 كيلو": [
                    {
                        "stock_id": 1,
                        "color_name": "أسود",
                        "quantity": 29
                    },
                    {
                        "stock_id": 2,
                        "color_name": "أحمر",
                        "quantity": 14
                    },
                    {
                        "stock_id": 4,
                        "color_name": "رمادى",
                        "quantity": 0
                    },
                    {
                        "stock_id": 5,
                        "color_name": "أبيض",
                        "quantity": 3
                    }
                ],
                "من 80 ل 100 ك": [
                    {
                        "stock_id": 6,
                        "color_name": "أحمر",
                        "quantity": 5
                    },
                    {
                        "stock_id": 7,
                        "color_name": "أسود",
                        "quantity": 20
                    }
                ],
                "من 120 ل 140 ك": [
                    {
                        "stock_id": 8,
                        "color_name": "أحمر",
                        "quantity": 5
                    },
                    {
                        "stock_id": 9,
                        "color_name": "أبيض",
                        "quantity": 45
                    },
                    {
                        "stock_id": 10,
                        "color_name": "رمادى",
                        "quantity": 8
                    },
                    {
                        "stock_id": 11,
                        "color_name": "أسود",
                        "quantity": 0
                    }
                ]
            },
            "images": {
                "أسود": [
                    "products/product_4.jpg",
                    "products/header-logo.jpg",
                    "products/adds1.jpg"
                ],
                "رمادى": [
                    "products/product_6.jpg",
                    "products/sweat-shirt-dress-sky.jpg"
                ],
                "أبيض": [
                    "products/adds2.jpg",
                    "products/product_12.jpg"
                ]
            }
        }
    ],
    "top_selling": [
        {
            "id": 2,
            "name": "سويت شيرت سوون",
            "description": "قطعة قطن 100% معالجة ضد أي انكماش ،وكمان مميزة جدا وهتناسب معاكي لأي خروجة، وتعملي ليها استايلنج بكذا شكل مُختلف.😍❤️",
            "feature": "top_selling",
            "price": 760,
            "discount": 250,
            "rating": "0.0",
            "reviews_count": 0,
            "main_img": "products/product_6.jpg",
            "category_id": 2,
            "stocks": {
                "من 80 ل 100 ك": [
                    {
                        "stock_id": 12,
                        "color_name": "أسود",
                        "quantity": 45
                    },
                    {
                        "stock_id": 13,
                        "color_name": "رمادى",
                        "quantity": 14
                    }
                ],
                "من 60 ل 80 كيلو": [
                    {
                        "stock_id": 14,
                        "color_name": "أحمر",
                        "quantity": 12
                    }
                ]
            },
            "images": {
                "أسود": [
                    "products/adds1_DVRguzh.jpg",
                    "products/product_10.jpg"
                ],
                "رمادى": [
                    "products/product_6_wqHjnc8.jpg"
                ],
                "أحمر": [
                    "products/product_3.jpg"
                ]
            }
        }
    ],
    "recently_arrived": [
        {
            "id": 3,
            "name": "فستان سوون",
            "description": "خامة ميلتون مبطن تقيل .🥰 (معالج ضد الوبرة و بيدفي جدا )",
            "feature": "recently_arrived",
            "price": 490,
            "discount": 90,
            "rating": "0.0",
            "reviews_count": 0,
            "main_img": "products/product_6.jpg",
            "category_id": 3,
            "stocks": {
                "من 120 ل 140 ك": [
                    {
                        "stock_id": 15,
                        "color_name": "أبيض",
                        "quantity": 20
                    }
                ]
            },
            "images": {
                "أبيض": [
                    "products/product_6_Yl1K9wk.jpg"
                ],
                "أسود": [
                    "products/product_10_d69u5SS.jpg"
                ]
            }
        }
    ]
}
```

#### categories

- URL: */categories || */categories/<int:pk> (for single category)
- Allow: GET, HEAD, OPTIONS
- Description: Retrieve categories data (id, name).
- Authentication: Not Required
- Request Parameters: [ordering={categoryName}, search={categoryName}]
- Response:
```json
[
    {
        "id": 1,
        "name": "ملحفة"
    },
    {
        "id": 2,
        "name": "سويت شيرت"
    },
    {
        "id": 3,
        "name": "فستان"
    },
    {
        "id": 4,
        "name": "عباية"
    }
]
```
  
#### products

- URL: */products || */products/<int:pk> (for single product)
- Allow: GET, HEAD, OPTIONS
- Description: Retrieve products data.
- Authentication: Not Required
- Request Parameters: ordering=[price, rating, discount], search=[name], feature={featureName/s}, category={categoryID/s}, size={sizeName/s}, color={colorName/s}
- Response:
  ```json
  {
    "count": 3,
    "next": "http://localhost:8000/api/v1/products?page=2",
    "previous": null,
    "results": [
        {
            "id": 1,
            "name": "ملحفة سوون",
            "description": "قطعة قطن 100% معالجة ضد أي انكماش ،وكمان مميزة جدا وهتناسب معاكي لأي خروجة، وتعملي ليها استايلنج بكذا شكل مُختلف.😍❤️",
            "feature": "top_discounts",
            "price": 650,
            "discount": 70,
            "rating": "0.0",
            "reviews_count": 0,
            "main_img": "products/product_6.jpg",
            "category_id": 1,
            "stocks": {
                "من 60 ل 80 كيلو": [
                    {
                        "stock_id": 1,
                        "color_name": "أسود",
                        "quantity": 29
                    },
                    {
                        "stock_id": 2,
                        "color_name": "أحمر",
                        "quantity": 14
                    },
                    {
                        "stock_id": 4,
                        "color_name": "رمادى",
                        "quantity": 0
                    },
                    {
                        "stock_id": 5,
                        "color_name": "أبيض",
                        "quantity": 3
                    }
                ],
                "من 80 ل 100 ك": [
                    {
                        "stock_id": 6,
                        "color_name": "أحمر",
                        "quantity": 5
                    },
                    {
                        "stock_id": 7,
                        "color_name": "أسود",
                        "quantity": 20
                    }
                ],
                "من 120 ل 140 ك": [
                    {
                        "stock_id": 8,
                        "color_name": "أحمر",
                        "quantity": 5
                    },
                    {
                        "stock_id": 9,
                        "color_name": "أبيض",
                        "quantity": 45
                    },
                    {
                        "stock_id": 10,
                        "color_name": "رمادى",
                        "quantity": 8
                    },
                    {
                        "stock_id": 11,
                        "color_name": "أسود",
                        "quantity": 0
                    }
                ]
            },
            "images": {
                "أسود": [
                    "products/product_4.jpg",
                    "products/header-logo.jpg",
                    "products/adds1.jpg"
                ],
                "رمادى": [
                    "products/product_6.jpg",
                    "products/sweat-shirt-dress-sky.jpg"
                ],
                "أبيض": [
                    "products/adds2.jpg",
                    "products/product_12.jpg"
                ]
            }
        },
        {
            "id": 2,
            "name": "سويت شيرت سوون",
            "description": "قطعة قطن 100% معالجة ضد أي انكماش ،وكمان مميزة جدا وهتناسب معاكي لأي خروجة، وتعملي ليها استايلنج بكذا شكل مُختلف.😍❤️",
            "feature": "top_selling",
            "price": 760,
            "discount": 250,
            "rating": "0.0",
            "reviews_count": 0,
            "main_img": "products/product_6.jpg",
            "category_id": 2,
            "stocks": {
                "من 80 ل 100 ك": [
                    {
                        "stock_id": 12,
                        "color_name": "أسود",
                        "quantity": 45
                    },
                    {
                        "stock_id": 13,
                        "color_name": "رمادى",
                        "quantity": 14
                    }
                ],
                "من 60 ل 80 كيلو": [
                    {
                        "stock_id": 14,
                        "color_name": "أحمر",
                        "quantity": 12
                    }
                ]
            },
            "images": {
                "أسود": [
                    "products/adds1_DVRguzh.jpg",
                    "products/product_10.jpg"
                ],
                "رمادى": [
                    "products/product_6_wqHjnc8.jpg"
                ],
                "أحمر": [
                    "products/product_3.jpg"
                ]
            }
        }
    ]
  }
``

#### sizes

- URL: */sizes || */sizes/<int:pk> (for single size)
- Allow: GET, HEAD, OPTIONS
- Description: Retrieve sizes data.
- Authentication: Not Required
- Request Parameters: ordering={sizeName}, search={sizeName}
- Response:
```json
[
    {
        "id": 1,
        "name": "من 60 ل 80 كيلو"
    },
    {
        "id": 2,
        "name": "من 80 ل 100 ك"
    },
    {
        "id": 3,
        "name": "من 120 ل 140 ك"
    }
]
```

#### colors

- URL: */colors || */colors/<int:pk> (for single color)
- Allow: GET, HEAD, OPTIONS
- Description: Retrieve colors data (id, name).
- Authentication: Not Required
- Request Parameters: ordering={colorName}, search={colorName}
- Response:
- 
```json
[
    {
        "id": 1,
        "name": "أسود"
    },
    {
        "id": 2,
        "name": "أحمر"
    },
    {
        "id": 4,
        "name": "رمادى"
    },
    {
        "id": 5,
        "name": "أبيض"
    }
]
```
