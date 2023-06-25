import jwt from 'jsonwebtoken'
import { users } from '../DB/Models/user.js';

const Roles = {User: 'User', Admin: 'Admin'}
const auth = (accessRoles)=>
{
    return async (req, res, next)=>
    {
        try 
        {
            const headerToken = req.headers['authorization'];
            if(!headerToken.startsWith(`${process.env.Bearer} `))
            {
                res.status(400).json({message: "invalid header token!"})
            }
            else
            {
                const token = headerToken.split(' ')[1]
                const decoded = jwt.verify(token, process.env.tokenSignature)
                if(!decoded)
                {
                    res.status(400).json({message: "invalid token"})
                }
                else
                {
                    const user = users.find(account => account.email == decoded.email)
                    if(user)
                    {
                        if(accessRoles.includes(user.role)) 
                        {
                            req.user = user
                            next()
                        }
                        else
                        {
                            res.status(401).json({message: "You are not authorized to do this!"})
                        }
                    }
                    else
                        res.status(404).json({message: "invalid user account"})
                }
            }    
        } 
        catch (error) 
        {
            if(error.name=='JsonWebTokenError')
            {
                res.status(500).json({message: "Invalid token catch", error: error.message})
            }
            else if(error.name == "TokenExpiredError")
            {
                res.status(500).json({message: "Session expired, pls login again", error: error.message})
            }
            else
            {
                console.log(error);
                if(error.toString() == "TypeError: Cannot read properties of undefined (reading 'startsWith')")
                {
                    res.json({message: "You might not be signed in, please check your login status"})
                }
                else
                {
                    res.status(500).json({message: "auth error catch", error: error.toString()})
                }
            }
        }
    }
}

export let Auth = 
{
    auth, 
    Roles
}