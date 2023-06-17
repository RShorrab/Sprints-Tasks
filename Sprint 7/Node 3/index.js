import http from 'http';
import axios from 'axios'
import util from 'util'
import url from 'url'
import Joi from 'joi';
 

let products = []
const getProducts = async (currency)=>
{
    let products =await axios.get('https://api.escuelajs.co/api/v1/products/?offset=10&limit=20').then(res => res.data)
    let exchangedProducts = await currencyExchange(products, currency)

    return filterProducts(exchangedProducts)
}
const filterProducts = async(products)=>
{
    let res = await axios.get("https://api.escuelajs.co/api/v1/categories/?limit=5")
    .then(res => res.data)
    
    let categories = []
    //not necessar .. just to construct wanted data
    res.map( category =>
        {
            category =
            {
                name: category.name,
                id: category.id,
                products: []
            }
            categories.push(category)
        })
    
        
    categories.map(category => 
    {
        products.map(product => 
        {
            if(product.category.id === category.id)
            {
                category.products.push(product)
            }
        });    
    })

    //console.log( util.inspect(categories, {showHidden: false, depth: null, colors: true}))
    return categories
}

const currencyExchange = async (products, currency="USD") =>
{
    let rate = await axios.get(`https://api.exchangerate.host/convert?from=USD&to=${currency}`).then(rate => rate.data.result)
    products.map(product =>
        {
            product.price =  product.price * rate
        })
    
    return products
}

const schema = Joi.object(
    {
      title: Joi.string().required(),
      price: Joi.number().required(),
      description: Joi.string(),
      categoryId: Joi.number().required(),
      images: Joi.array()
    });

const requestListener = async (req, res)=>
{
    const method = req.method;
    const route = req.url
    const query = url.parse(route, true).query;

    if(method === "GET" && route ==='/products')
    {
        res.setHeader("Content-Type", "application/json")
        res.writeHead(200);
        products = await getProducts()
        res.end(JSON.stringify(products))
    }
    else if(method === "GET" && route ===`/products/?curr=${query.curr}`)
    {
        res.setHeader("Content-Type", "application/json")
        res.writeHead(200);
        products = await getProducts(query.curr)
        res.end(JSON.stringify(products))
    }
    else if(method === "POST" && route ==='/products')
    {
        const body = [];
        req.on("data", (chunk)=> body.push(chunk))
           .on("end", async ()=>
            {
                try {
                    const newProduct = schema.validate(JSON.parse(Buffer.concat(body).toString()), { abortEarly:false}); 
                    if(newProduct.error)
                    {
                        res.end(JSON.stringify({message: "Validation Error", error: newProduct.error.toString()}))
                    }
                    
                    const result = await axios.post(" https://api.escuelajs.co/api/v1/products/", newProduct.value)
                    res.setHeader("Content-Type", "application/json");
                    res.writeHead(201);
                    res.end(JSON.stringify(result.data))
                    
                } catch (error) {
                    console.log("error message", error.toString());
                    res.end(JSON.stringify({message: "Catch Error", error: error.toString()}))
                }
            })
    }
    else
    {
        res.end("Invalid URL!")
    }

}
const server = http.createServer(requestListener)
server.listen(3000, "localhost", ()=> console.log(`Listening on "http://localhost:3000"...`))