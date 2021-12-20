const express = require('express');
const ROUTE = express.Router();

const paymentController = require('../../controller/payment/payment');

ROUTE.post('/create-account',paymentController.createAccount);
ROUTE.post('/create-customer',paymentController.createCustomer);
ROUTE.post('/create-card-token',paymentController.createCardToken);
ROUTE.post('/create-card',paymentController.createCard);
ROUTE.post('/make-payment',paymentController.makePayment);
ROUTE.get('/get-all-accounts',paymentController.accountList);
ROUTE.put('/update-account',paymentController.updateAccount);
ROUTE.post('/create-product',paymentController.createProduct);
ROUTE.post('/create-price-for-product',paymentController.createPriceForProduct);
ROUTE.get('/list-of-product',paymentController.productList);
ROUTE.get('/list-of-prices',paymentController.priceList);
ROUTE.post('/payment-through-card',paymentController.cardPayment);
ROUTE.delete('/delete-customer',paymentController.deleteCustomer);
ROUTE.delete('/delete-account',paymentController.deleteAccount);
ROUTE.get('/retrieve-account',paymentController.retrieveAccount);
ROUTE.post('/subcribe',paymentController.subcribeProduct);
ROUTE.get('/retrieve-token-data',paymentController.getRetrieveToken);
ROUTE.get('/get-all-card',paymentController.getAllCrad);
module.exports = ROUTE;