const express = require('express');
const cors = require('cors')
const hostname="0.0.0.0"
const port = process.env.PORT || 3000;
const app=express();

//routes;
const registerOwner= require('./routes/registerOwner');
const loginOwner = require('./routes/loginOwner');

//middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(registerOwner);
app.use(loginOwner);


var corsOptions = {
    // origin: function (origin, callback){ callback(null, true)},
    origin:"*",
    methods: ['GET', 'POST','PATCH','DELETE'], // Specify your origin here
    credentials: true,  // This allows the session cookie to be sent back and forth
    //optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };


app.get("/",(req,res)=>{
    res.json({"success":"App deployed sucessfully"})
})

app.listen(port,hostname,()=>{
    console.log(`app started listening http://localhost:${port}`);
})

module.exports = app;