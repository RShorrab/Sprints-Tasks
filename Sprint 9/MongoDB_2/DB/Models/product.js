import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
   title: {type: String, required: true},
   price: {type: Number, required: true}, 
   description: {type: String},

}, {timestamps: true})

const productModel = mongoose.model('Product', productSchema)
export default productModel