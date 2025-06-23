import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';


const app = express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

// Data will come in many formats, it may be in json format. so we should limit json so our server will not crash
app.use(express.json({limit:'16kb'}))

// URL configration so express can understand that data is coming from URL
app.use(express.urlencoded({extended: true, limit:"16kb"}))

// configration for files keep public like public assest 
app.use(express.static("public"))

// we can set user browser's cookies and we should perform CRUD operation on user cookies
app.use(cookieParser());


//routes import 
import userRouter from './routes/user.routes.js';


// routes declaration
app.use("/api/v1/users", userRouter)

export {app}