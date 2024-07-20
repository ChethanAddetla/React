const express = require('express');
const mongoose =require('mongoose')
const userRoutes = require('./routes/userRoutes');
const msgRoutes = require('./routes/msgRoutes');
const cors = require('cors')


const app=express();

const PORT = 5000;

const db = "mongodb+srv://chethanaddetlapp:saichethan@cluster0.gymgrke.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(db)

app.use(express.json())
app.use(cors())
app.use('/user',userRoutes);
app.use('/msg',msgRoutes);
app.use(express.urlencoded({extended :false}));





app.get('/',(req,res)=>{
    res.send("hi bro")

})

app.listen(PORT,()=>{console.log('server is running on port '+PORT)})