#### User
- [POST] `/user/signup`
- [POST] `/user/signin`
- [GET] `/user/` -> Get all users
```
  email: string
  password: string
```

#### Products
- [GET] `/products/`
- [GET] `/products/categorized` 
- [GET] `/products/curr=:curr`
- [GET] `/products/:id` 
- [POST] `/products/add`               [Login required]
- [PUT] `/products/update/:id`         [Login required]
- [DELETE] `/products/delete/:id`      [Login required]
```
  title: string
  price: number
  description: string
  categoryId: number
  images: array of strings
```

#### Categories
- [GET] `/categories/` 
- [GET] `/categories/:id` 
- [POST] `/categories/add`               [Login required]
- [PUT] `/categories/update/:id`         [Login required, Admins only]
- [DELETE] `/categories/delete/:id`      [Login required, Admins only]
```
  name: string
  image: strung   -> You can use this link.. https://placeimg.com/640/480/any
```


#### http://localhost:3000
```
Admin account: {email: admin@e.com, password: Ah1dje*r}
```
