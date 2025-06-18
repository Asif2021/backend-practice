// require('dotenv').config({path:'./env'})
import dotenv from 'dotenv'
import connectDB from './db/db.js';

dotenv.config({
    path:'./env'
})

connectDB();





// import express from 'express'
// const app = express()

// // use semicolon before IIFE is professional approach
// ;( async ()=>{
// try{
// await mongoose.connect(`${process.env.MONGODB_URI}/${
//     DB_NAME}`)
//     app.on("error", (error)=>{
//         console.log("ERROR: ", error)
//         throw error

//     app.listen(process.env.PORT, ()=>{
//         console.log(`App is listing on port ${process.env.PORT}`)
//     })
//     })
// } catch(error){
// console.error("ERROR: ", error)
// throw error
// }
// })()