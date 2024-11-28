const express = require('express');
const mongoose = require('mongoose')
const pageController = require("./controllers/pageController");
const pageRoute = require("./routes/pageRoutes");
const courseRoute = require("./routes/courseRoute");
const categoryRoute = require("./routes/categoryRoute");
const userRoute = require("./routes/userRoute");
const app = express();


//Template Engine
app.set("view engine", "ejs");

//MIDDLEWARE
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//Routes
app.use('/', pageRoute)
app.use('/courses',courseRoute)
app.use('/categories',categoryRoute)
app.use('/users',userRoute)

//connect db
mongoose.connect("mongodb://localhost/smartedu-db").then(()=>{
    console.log('Connected DB')
})

const port = 3000;
app.listen(port, () => {

    console.log(`uygulama ${port} portunda baslatildi`);
})
