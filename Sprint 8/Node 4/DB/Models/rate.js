import axios from "axios";

const getRate = async (currency)=>
{
    return await axios.get(`https://api.exchangerate.host/convert?from=USD&to=${currency}`).then(rate => rate.data.result)
}
export default getRate