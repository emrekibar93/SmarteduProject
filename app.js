const express = require('express');
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const methodOverride = require('method-override')
const pageController = require("./controllers/pageController");
const pageRoute = require("./routes/pageRoutes");
const courseRoute = require("./routes/courseRoute");
const categoryRoute = require("./routes/categoryRoute");
const userRoute = require("./routes/userRoute");
const app = express();


//Template Engine
app.set("view engine", "ejs");

//GLOBAL Variable
global.userIN = null;

//MIDDLEWARE

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smartedu-db' })
}))
app.use('*', (req, res, next) => {
    userIN = req.session.userID;
    next();
})
app.use(flash());
app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
})
app.use(methodOverride('_method',{
     methods: ['POST','GET']
}))

//Routes
app.use('/', pageRoute)
app.use('/courses', courseRoute)
app.use('/categories', categoryRoute)
app.use('/users', userRoute)

//connect db
mongoose.connect("mongodb+srv://emrekibar93:zolfAxnxAHMMeH16@cluster0.nf7jr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log('Connected DB')
})

const port = process.env.port || 3000;
app.listen(port, () => {

    console.log(`uygulama ${port} portunda baslatildi`);
})
