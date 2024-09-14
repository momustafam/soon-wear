# Soon Wear - Fashion E-Commerce Platform

**Soon Wear** is a fashion e-commerce platform built for a Facebook clothing page. It provides a seamless shopping experience, focusing on scalability, security, and performance. The platform allows users to browse and purchase products, manage their orders, and make secure payments. The project was developed using **Django** for the backend, **React** for the frontend, and **MySQL** as the database.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributors](#contributors)
- [License](#license)

## Features

- **User Authentication**: Secure registration, login, and logout functionality.
- **Product Management**: Admins can add, update, and delete products.
- **Order Processing**: Users can add products to their cart, place orders, and track them.
- **Secure Payment Integration**: Integrated secure payment gateways to manage transactions.
- **Real-time Inventory Updates**: Automated stock level adjustments based on user purchases.
- **RESTful API**: Built for real-time interactions such as inventory updates and user actions.
- **Responsive UI**: Frontend optimized for various screen sizes.

## Technologies

- **Backend**: Django (Python)
- **Frontend**: React (JavaScript)
- **Database**: MySQL
- **Payment Gateway**: Integrated with secure online payment services
- **RESTful API**: Django REST framework

## Installation

### Prerequisites

- Python 3.x
- Node.js & npm
- MySQL
- Docker (optional, for containerization)
- Virtual Environment (optional, for isolating dependencies)

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/soon-wear.git

2. Navigate to the backend directory and set up a virtual environment:
   ```bash
   cd soon-wear/backend
   python3 -m venv venv
   source venv/bin/activate
   
3. Install the required Python packages:
   ```bash
   bash
   Copy code
   pip install -r requirements.txt

4. Set up the database:
   ```bash
   python manage.py migrate

5. Create a .env file with the necessary environment variables:
   ```bash
   SECRET_KEY=your-secret-key
   DATABASE_NAME=your-database-name
   DATABASE_USER=your-database-user
   DATABASE_PASSWORD=your-database-password

6. Run the development server:
   ```bash
   python manage.py runserver

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   Copy code
   cd ../frontend

2. Install the required npm packages:
   ```bash
   Copy code
   npm install

3. Run the React development server:
   ```bash
   Copy code
   npm start

### Usage
* Visit the frontend by navigating to http://localhost:3000.
* Admin users can log in to the dashboard to manage products.
* Customers can browse products, add them to the cart, and proceed to checkout using the integrated payment system.
* After placing an order, users can track their order status in real-time.


### API Endpoints
Authentication
* POST /api/auth/login/ – Login user
* POST /api/auth/register/ – Register new user
Products
* GET /api/products/ – Get all products
* POST /api/products/ – Add a new product (Admin only)
Orders
* POST /api/orders/ – Place a new order
* GET /api/orders/{id}/ – Get order details
Inventory
* GET /api/inventory/ – Get current stock levels
* POST /api/inventory/update/ – Update inventory after a purchase
Contributors
Backend Development: [Mohammed Mustafa](https://www.linkedin.com/in/momustafam/)
Frontend Development: [Yousef Ayman](https://github.com/yousefayman2003)
