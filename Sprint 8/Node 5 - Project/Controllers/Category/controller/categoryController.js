import categoryDB from '../../../DB/Models/category.js'


const getAllCategories = async(req, res)=>
{
    let categories = await categoryDB('get', 'https://api.escuelajs.co/api/v1/categories/?offset=10&limit=20')    
    res.status(200).json({categories})
}
const getCategory = async(req, res)=>
{
    try 
    {
        let {id} = req.params
        let category = await categoryDB('get', `https://api.escuelajs.co/api/v1/categories/${id}`)
        res.json({category})
    } catch (error) 
    {
        res.status(400).json({Error: error.message, Note: `If error message is "Request failed...", it's mostly something related to the api.`})
    }
}
const addCategory = async (req, res)=>
{
    try {
        const category = req.body
        let link = "https://api.escuelajs.co/api/v1/categories/"
        let response = await categoryDB('post', link, category)

        res.json({message: "Process succeeded", category: response }) 
    } 
    catch (error) 
    {
        res.status(400).json({Error: error.message})
    }
}
const updateCategory = async (req, res)=>
{
    try 
    {
        let {id} = req.params
        let category = req.body
        let link = `https://api.escuelajs.co/api/v1/categories/${id}`
        let response = await categoryDB("put", link, category)

        res.json({message: "Process succeeded", category: response }) 
    } catch (error) 
    {
        res.status(400).json({Error: error.message})
    }
}
const deleteCategory = async (req, res)=>
{
    try 
    {
        let {id} = req.params
        let link = `https://api.escuelajs.co/api/v1/categories/${id}`
        let response = await categoryDB("del", link)

        res.json({message: "Process succeeded", response })
    } catch (error) 
    {
        res.status(400).json({Error: error.message})
    }
}



let controller =
{
    getAllCategories,
    getCategory,
    addCategory,
    updateCategory,
    deleteCategory,
}
export default controller;