import {User, users} from "../../../DB/Models/user.js";
import  jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


let signup = async (req, res)=>
{
    try {
        let user = new User(req.body)
        user.password = await bcrypt.hash(user.password, parseInt(process.env.SaltRound))
        user.token = jwt.sign({email: user.email, role: user.role}, process.env.tokenSignature, {expiresIn: '1h'})
        users.push(user)

        res.json({users}) 
    } 
    catch (error) {
        console.log('Signup catch error...'+ error);
        res.status(500).json({message: "Signup catch error", error: error.toString()})
    }
}

let signin = async (req, res)=>
{
    let {email, password} = req.body
    let user = users.find( account => account.email == email)
    if(user)
    {
        let match = await bcrypt.compare(password, user.password);
        if(match)
        {
            user.token = jwt.sign({email: user.email, role: user.role}, process.env.tokenSignature, {expiresIn: '1h'});
            return res.status(200).json({user})
        }
        else
            return res.status(401).json({message: "Wrong password!"})
    }
    else
        res.status(401).json({message: "Invalid User!"})
}
let getUsers = (req, res)=>
{
    return res.status(200).json({users})
}



let controller =
{
    signup, 
    signin, 
    getUsers
}
export default controller;