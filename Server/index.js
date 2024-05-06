const express = require('express');
const mongoose = require('mongoose');
const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY);
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors=require('cors');
const cookieParser=require("cookie-parser")
const adminRoute =require("./routes/Admin.js")
const JobsRoute=require("./routes/Jobs.js")
const DataBase=require("./routes/DataBase.js");
const Stripe=require("./routes/Stripe.js")
const app = express();

//1dX00PzApP27G9PR
//mongodb+srv://84severin:1dX00PzApP27G9PR@cluster0.xwr044z.mongodb.net/
//mongodb+srv://84severin:<password>@cluster0.xwr044z.mongodb.net/

async function connect(){
    try{
        await mongoose.connect('mongodb+srv://84severin:ciuJAoJD0B4YVOAJ@cluster0.ti5j2gz.mongodb.net/BookingApptrail104', {})
        console.log("Connected");
    }catch(error){
        console.log(error);
    }
}

connect();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//app.use("/api",adminRoute)


app.use("/api/admin",adminRoute)
app.use("/api",JobsRoute);
app.use("/api/database",DataBase)
app.use('/api/stripe',Stripe)
//const PORT = process.env.PORT || 5000
const PORT=5000
app.listen(PORT, () => {  console.log(`Server is running on port ${PORT}`)});

//app.use("/api/admin",AdminRoute)
//mongoose.connect('mongodb+srv://84severin:1dX00PzApP27G9PR@cluster0.xwr044z.mongodb.net/BookingTrail', {useNewUrlParser: true, useUnifiedTopology: true}).on('error', (err) => {  console.log(err);}).once('open', () => {  console.log('Database Connection Established')});

//mongoose.connect('mongodb+sr://84severin:1dX00PzApP27G9PR@cluster0.xwr044z.mongodb.net/BookingTrail102', {useNewUrlParser: true, useUnifiedTopology: true}).then(console.log("DB Connected")).catch((err)=>console.log(err))


//ciuJAoJD0B4YVOAJ