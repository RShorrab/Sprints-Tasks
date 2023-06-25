import axios from "axios";

const categoryDB = async (method, link, category)=>
{
    switch (method) {
        case "get":
            return await axios.get(link).then(res => res.data)
        case "post":
            return await axios.post(link, category).then(res => res.data)
        case "put":
            return await axios.put(link, category).then(res => res.data)
        case "del":
            return await axios.delete(link).then(res => res.data)
        default:
            break;
    }
}

export default categoryDB



/* 
case "get":
    {
        let categories = []
        await axios.get(link).then(res => res.data).then(data => 
            {   //not necessar .. just to construct wanted data
                data.map( category =>
                    {
                        category =
                        {
                            name: category.name,
                            id: category.id,
                        }
                        categories.push(category)
                    })
            })
            return categories
    }
*/