import axios from "axios";

const categorizeProducts = async ()=>
{
    let res = await axios.get("https://api.escuelajs.co/api/v1/categories/?limit=5")
    .then(res => res.data)
    
    let categories = []
    //not necessar .. just to construct wanted data
    res.map( category =>
        {
            category =
            {
                name: category.name,
                id: category.id,
                products: []
            }
            categories.push(category)
        })

    return categories
}
export default categorizeProducts