#### User
- [POST] `/user/signup`
- [POST] `/user/signin`
- [GET] `/user/:id` -> Get user info [Login required]
- [PUT] `/user/update`    [Login required]
- [DELETE] `/user/delete` [Login required]
```
  "email": "string"
  "password": "string"
```

#### Products
- [GET] `/product/` -> Get all products
- [GET] `/product/:id` -> Get a product info
- [POST] `/product/add`               [Login required]
- [PUT] `/product/update/:id`         [Login required]
- [DELETE] `/product/delete/:id`      [Login required]
- [PATCH] `/product/:id/addToCart`    [Login required]
```
  "title": "string"
  "price": "number"
  "description": "string"
```

#### http://localhost:3000
- You should fill 'DB_CONNECTION' with a value first (.env)
