const express=require('express');
const mysqlPool = require('./config/db');

const app=express();

const PORT=8000;

const bodyparser=require('body-parser');


//middlewares
// app.use(express.urlencoded({extended:false}));

app.use(bodyparser.urlencoded({extended:true}));
// app.use(bodyparser.json());
//routes
app.use("/admin", require("./routes/addReview"));


// db
mysqlPool.query('SELECT 1').then(()=>{
    console.log('Db connected');

    app.listen(PORT,()=>{
        console.log("server started");
    });
}).catch(err=>console.log(err));