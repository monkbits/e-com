import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js';

//configure dotenv
dotenv.config(); // agar env file root ke alawa kahi aur he to config ke andr object dena { path: ''}

//database config
connectDB();

// rest object
const app = express();

//middleware
app.use(express.json())//request aur response me app json data bhi bhej skte hai pehle hhim body parser ka use krte the ab express me by default ye aatahai.
app.use(morgan('dev'));

//routes
app.use('api/V1/auth', authRoute);

// rest api
app.get('/', (req, res) => {
    res.send(
        `<h1>welcome to ecommerce app</h1>`
    )
})

//port
// const PORT = 8080;
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
    console.log(`Server is running ${process.env.DEV_MODE} on mode on ${PORT}`.bgCyan.white);
})
