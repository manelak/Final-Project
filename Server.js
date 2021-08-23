const express = require ('express');
require('dotenv').config();
const connectDB = require ('./Config/ConnectDB')
const app = express();
const cors = require("cors");



app.use(cors());

//Connect To Database
connectDB();

//create Routes
app.use(express.json());
app.use('/API', require('./Routes/UserRoutes'));
app.use('/PROFILE',require ('./Routes/ProfileRoutes'));
app.use('/POSTS',require ('./Routes/PostsRoutes') );
app.use('/PLUMBER',require('./Routes/PlumberRoutes'))

const PORT = process.env.PORT 
app.listen(PORT,(err)=>{
    err ? console.error(err) : console.log(`Server is Runing On Port ${PORT}`)
});