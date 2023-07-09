import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}, 
    role: {type: String, default: 'User'},
    cart: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],

}, {timestamps: true})

userSchema.pre('save', async function(next)
{    
    this.password = await bcrypt.hash(this.password, parseInt(process.env.SaltRound))
    next()
})


const userModel = mongoose.model('User', userSchema)
export default userModel