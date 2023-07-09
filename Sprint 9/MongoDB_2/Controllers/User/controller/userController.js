import userModel from '../../../DB/Models/user.js';
import  jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


let signup = async (req, res)=>
{
    try {
        const {email, password} = req.body
        const user = new userModel({email, password})
        const savedUser = await user.save()
        res.json({savedUser}) 
    } 
    catch (error) {
        if(error.keyValue?.email)
        {
            res.status(409).json({message: 'Email is lready used by another account.'})
        }
        else
        {
            console.log('Signup catch error...'+ error);
            res.status(500).json({message: "Signup catch error", error})
        } 
    }
}

let signin = async (req, res)=>
{
    const {email, password} = req.body;
    const user = await userModel.findOne({email})
    if(user)
    {
        const match = await bcrypt.compare(password, user.password)
        if(match)
        {
            const token = jwt.sign({email: user.email, role: user.role, id: user._id}, process.env.tokenSignature, {expiresIn: '1h'});
            return res.status(200).json({message: "Login succeeded", token})
        }
        else
            return res.status(401).json({message: "Wrong password!"})
    }
    else
        res.status(401).json({message: "Invalid User!"})
}

let accountInfo = async (req, res)=>
{
    const {id} = req.params
    const user = await userModel.findById(id)
    if(user._id == req.user._id || req.user.role == 'Admin')
        res.status(200).json({user})
    else
        res.json({message: 'You are not authorized to see this info!!'})

}
let updateAccount = async (req, res)=>
{
    try 
    {
        let {email, password} = req.body;
        let user = await userModel.findById(req.user._id)

        if(user.email==email)
        {
            const match = await bcrypt.compare(password, user.password)
            if(match)
            {
                return res.json({message: "There is nothing to update!"})
            }
            password = await bcrypt.hash(password, parseInt(process.env.SaltRound))
            await userModel.findOneAndUpdate({_id: user._id}, {password})
            res.status(201).json({message: "password updated"})
        }
        else
        {
            const existedUser = await userModel.findOne({email}) //in case of used email
            if(existedUser)
                res.json({message: "this email belongs to another account!"}) 
            else
            {
                password = await bcrypt.hash(password, parseInt(process.env.SaltRound))
                user = await userModel.findOneAndUpdate({_id: user._id}, {email, password})                
                res.status(201).json({message: "Updated", user})
            }
        }

    } catch (error) 
    {
        console.log('Catch error...'+ error);
        res.status(500).json({message: "Catch error", error: error.toString()})    
    }
}

let deleteAccount = async (req, res)=>
{
    try
    {
        const user = await userModel.findById(req.params.id)
        if(user._id.toString() == req.user._id.toString() || req.user.role == "Admin") //account owner or admin
        {
            await userModel.findByIdAndDelete(user._id)
            res.status(200).json({message: "Account has been deleted"}) 
        }
        else
            res.status(401).json({message: "invalid user account or account is already deleted!"})
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({message: "Catch error", error: error.toString()})
    }
}


let controller =
{
    signup, 
    signin, 
    accountInfo,
    updateAccount,
    deleteAccount
}
export default controller;