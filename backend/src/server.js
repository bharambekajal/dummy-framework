require('dotenv').config({path : `${process.cwd()}/.env`});
const express = require('express')
const authRoutes = require('./routes/auth')
const businessScreenRoutes = require("./routes/businessScreen")
const userRegister = require('./routes/userRegister')
const cors = require('cors');
const { verifyToken } = require('./utils/middleware/authMiddleware');

const app = express();

app.use(cors())

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/post',verifyToken, businessScreenRoutes);

app.use('/api/user', userRegister)
app.listen( process.env.PORT,()=>{
    console.log("App listening to port " ,process.env.PORT)
})

