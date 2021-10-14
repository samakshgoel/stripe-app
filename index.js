require('dotenv').config()
const express = require('express');
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(require('cors')())


const PAYMENTSTRIPE = require('./routes/payment/payment');

app.use('/payment',PAYMENTSTRIPE);

app.listen(PORT,()=>{
    console.log("http://localhost:3001");
})