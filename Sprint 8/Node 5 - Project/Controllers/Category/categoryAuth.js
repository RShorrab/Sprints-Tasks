import { Auth } from "../../middleware/auth.js";
const { Roles } = Auth

const endpoints = 
{
    all : [Roles.Admin, Roles.User],
    adminOnly: [Roles.Admin]
}
export default endpoints
