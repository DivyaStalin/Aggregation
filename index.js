const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
const app = express();

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());



const env = require("dotenv").config();
app.use(express.json());


const userroute = require("./routes/userroute");

const port = 5000;
const uri = process.env.db_url;
mongoose.connect(
    uri, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>{
    console.log("Database Connected");
})
.catch((err)=>{
    console.log("DB error",err);
});



app.use("/user",userroute);



app.listen(port,() => {
    console.log("App is listening port:4000");
});
