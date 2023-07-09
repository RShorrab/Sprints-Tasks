import mongoose from 'mongoose';

export let dbconnection = ()=>
{
    mongoose.connect(process.env.DB_CONNECTION).then(()=> console.log('db connected')).catch((error)=> console.log(error))
}

