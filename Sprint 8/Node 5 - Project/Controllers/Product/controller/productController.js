import productDB from '../../../DB/Models/product.js'
import categoriesDB from '../../../DB/Models/category.js'
import rates from '../../../DB/Models/rate.js'


const getAllProducts = async(req, res)=>
{
    let products = await productDB('get', 'https://api.escuelajs.co/api/v1/products/?offset=10&limit=20')    
    res.json(products)
}
const getProduct = async(req, res)=>
{
    try 
    {
        let {id} = req.params
        let product = await productDB('get', `https://api.escuelajs.co/api/v1/products/${id}`)
        res.json(product)
    } catch (error) 
    {
        res.status(400).json({Error: error.message, Note: `If error message is "Request failed...", it's something related to the api.`})
    }
}
const addProduct = async (req, res)=>
{
    try {
        const product = req.body
        let link = "https://api.escuelajs.co/api/v1/products/"
        let response = await productDB('post', link, product)

        res.json({message: "Process succeeded", product: response })
    } 
    catch (error) 
    {
        res.status(400).json({message: "Controller error", Error: error.message})
    }
}

const updateProduct = async (req, res)=>
{
    try 
    {
        let {id} = req.params
        let product = req.body
        let link = `https://api.escuelajs.co/api/v1/products/${id}`
        let response = await productDB("put", link, product)

        res.json({message: "Process succeeded", product: response }) 
    } catch (error) 
    {
        res.status(400).json({Error: error.message})
    }
}

const deleteProduct = async (req, res)=>
{
    try 
    {
        let {id} = req.params
        let link = `https://api.escuelajs.co/api/v1/products/${id}`
        let response = await productDB("del", link)

        res.json({message: "Process succeeded", response })
    } catch (error) 
    {
        res.status(400).json({Error: error.message})
    }
}

const getCategorized = async(req, res)=>
{
    let categories = await categoriesDB('get', "https://api.escuelajs.co/api/v1/categories/?limit=5")
    let products = await productDB('get', 'https://api.escuelajs.co/api/v1/products/?offset=10&limit=20')

    categories.map(category => 
        {
            category.products = []
            products.map(product => 
            {
                if(product.category.id === category.id)
                {
                    category.products.push(product)
                }
            });    
        }) 
   
    res.json({categories})
}
const getWithRate = async (req, res)=>
{
    try 
    {
        let {curr} = req.params
        let rate = await rates(curr)
        if (rate == null || rate == 0) 
        {
            res.json({Error: "Invalid currency!"})
        }
        else
        {
            let products = await productDB('get', 'https://api.escuelajs.co/api/v1/products/?offset=10&limit=20')  
            products.map(product =>
                {
                    product.price =  product.price * rate
                })

            res.json({message: "Process succeeded", products })
        }
    } catch (error) 
    {
        res.status(400).json({Error: error.message})
    }
}


let controller =
{
    getAllProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,

    getCategorized,
    getWithRate
}
export default controller;