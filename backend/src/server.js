require('dotenv').config({path : `${process.cwd()}/.env`});
const express = require('express')
// const businessScreenRoutes = require("./routes/businessScreen")
// const userRegister = require('./routes/index.js')
const cors = require('cors');
// const { verifyToken } = require('./utils/middleware/authMiddleware');
const {endpoints} = require('./constants');
const { router } = require('./routes');

const app = express();

app.use(cors())

app.use(express.json());

app.use(endpoints.ROOT, router);

// app.use('/api/post',verifyToken, businessScreenRoutes);

// app.use('/api/user', userRegister)

app.listen( process.env.PORT,()=>{
    console.log("App listening to port " ,process.env.PORT)
})

