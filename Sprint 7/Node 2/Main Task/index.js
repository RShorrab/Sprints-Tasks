import axios from 'axios'
import util from 'util'


const getProducts = async ()=>
{
    let products =await axios.get('https://api.escuelajs.co/api/v1/products/?offset=10&limit=20').then(res => res.data)
    let exchangedProducts = await currencyExchange(products)

    return filterProducts(exchangedProducts)
}

const filterProducts = async(products)=>
{
    let res = await axios.get("https://api.escuelajs.co/api/v1/categories")
    .then(res => res.data)
    
    let categories = []
    //not necessar .. just to construct data
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

    console.log( util.inspect(categories, {showHidden: false, depth: null, colors: true}))
}

const currencyExchange = async (products) =>
{
    let rate = await axios.get("https://api.exchangerate.host/convert?from=USD&to=EGP").then(rate => rate.data.result)
    products.map(product =>
        {
            product.price =  product.price * rate
        })
    
    return products
}



getProducts()

