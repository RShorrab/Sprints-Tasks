export let users = [{email: "admin@e.com", password: "$2b$04$7Rb5gHaMl2kPCQ/Ixoact.wuqCnSrgiX.Tn9o6hqHTsPPbgh.h6b6", role: "Admin"}] //password: Ah1dje*r 
export class User
{
    email
    password
    role
    token
    
    constructor(user)
    {
        this.email = user.email
        this.password = user.password
        this.role = "User" //Admin - User
    }    
}


