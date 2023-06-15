import axios from 'axios'

const getProducts = async ()=>
{
    let products =await axios.get('https://api.escuelajs.co/api/v1/products').then(res => res.data)
    filterProducts(products)
}

const filterProducts = async(products)=>
{
    let categories = await axios.get("https://api.escuelajs.co/api/v1/categories").then(res=>res.data)
    categories.forEach(category => 
    {
        category.products = []
        products.forEach(product => 
        {
            if(product.category.id === category.id)
            {
                category.products.push(product)
            }
        });
        //console.log(category);
               
    }).then(console.log())

    //console.log(categories);
}

getProducts()
//filterProducts()