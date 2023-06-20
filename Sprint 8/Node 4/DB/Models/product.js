import axios from "axios";

const productDB = async (method, link, product)=>
{
    switch (method) {
        case "get":
            return await axios.get(link).then(res => res.data)
        case "post":
            return await axios.post(link, product).then(res => res.data)
        case "put":
            return await axios.put(link, product).then(res => res.data)
        case "del":
            return await axios.delete(link).then(res => res.data)
        default:
            break;
    }
}

export default productDB