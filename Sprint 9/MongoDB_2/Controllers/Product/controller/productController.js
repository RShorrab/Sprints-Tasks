import productModel from '../../../DB/Models/product.js'
import userModel from '../../../DB/Models/user.js';

const getAllProducts = async(req, res)=>
{
    const products = await productModel.find();
    res.status(200).json({message: "All products displayed", products})
}
const getProduct = async(req, res)=>
{
    const {id} = req.params
    const product = await productModel.findOne({_id: id})
    if(product)
        res.status(200).json(product)
    else 
        res.status(401).json({message: "invalid product id"})
}
const addProduct = async (req, res)=>
{
    try
    {
        const {title, price, description} = req.body
        const newProduct = new productModel({title, price, description})
        await newProduct.save()
        res.status(200).json({message: "product created successsfully", newProduct})
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({message: "create product failed!!", error: error.toString() })
    }
}

const updateProduct = async (req, res)=>
{ 
    try
    {
        const {title, price, description} = req.body
        const {id} = req.params
        const product = await productModel.findOne({_id: id})

        if(!product)
        {
            res.status(404).json({message: "invalid product id"})
        }
        else
        {
            const updatedProduct = await productModel.findByIdAndUpdate(id, {title, price, description})
            res.status(200).json({message: "product updated successfully"})
        }
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({message: "update product catch error!", error: error.toString()})
    }
}

const deleteProduct = async (req, res)=>
{
    try 
    {
        const product = await productModel.findById(req.params.id)
        if(!product)
        {
            res.status(200).json({message: "Invalid product id"})
        }
        else
        {
            await productModel.findByIdAndDelete(product._id)
            await userModel.updateMany({cart: {$in: req.params.id}}, {$pull: {cart: req.params.id}} )  // remove from users cart
            
            res.status(200).json({message: "product deleted successfully"})
        }

    } catch (error) 
    {
        console.log(error);
        res.status(500).json({message: "delete post catch error!", error})
    }
}

let addToCart = async (req, res)=>
{
    try 
    {
        const product = await productModel.findById(req.params.id)
        if(product)
        {
            const user = await userModel.findById(req.user._id)
            if(user.cart.includes(req.params.id))
            {
                //await userModel.findByIdAndUpdate(req.user._id, {$pull: {cart: req.params.id} }) //remove it from cart 
                res.json({message: "This product is already in your cart!"})
            }
            else
            {
                await userModel.findByIdAndUpdate(req.user._id, {$push: {cart: req.params.id} })
                res.status(200).json({message: "Added to cart"})
            }
        }
        else
            res.json({message: "Invalid product id!"})
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).json({message: "Catch error!", error})
    }
}

let controller =
{
    getAllProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    addToCart
}
export default controller;