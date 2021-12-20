const stripe = require('stripe')(process.env.STRIPE_KEY);

const paymentquery = {}

paymentquery.createAccountForUser = async function(Data){
    return await  stripe.accounts.create({
        type: 'custom',
        country: 'IN',
        business_type:"company",
        email: Data.email,
        capabilities: {
            card_payments: {requested: true},
            transfers: {requested: true},
        },
        company:{name:"MyCompany",tax_id:"00000000"},
        external_account:{
            object:"bank_account",
            country:"IN",
            currency:"INR",
            account_holder_name: Data.name,
            routing_number:"HDFC0000261",
            account_number :"000123456789",
            account_holder_type:"company"
        },
        business_profile:{
            product_description:Data.product_description,
            name:Data.name
        },
        tos_acceptance: {
            date: Math.floor(Date.now()/1000),
            ip: '10.0.0.4'
        }
    });
}

paymentquery.retrieveToken = async function(tokenID){
    return await stripe.tokens.retrieve(tokenID);
}


paymentquery.getAllAcountList = async function(limit){
    return await stripe.accounts.list({
        limit: limit,
    });
}


paymentquery.createCustomer = async function(email){
    return await stripe.customers.create({
      description: 'Customer of new Project',
      email:email
    });
}

paymentquery.updateAccountInfo = async function(data){
    console.log("DATA ",data)
    return await stripe.accounts.update(
        id,
    {
        business_profile: {
        name:data.name,
        product_description:data.product_description
        },
    
    }
    //   data.id,
    //   {
    //     external_account:{
    //         // routing_number:data.routing_number,
    //         // account_number :"000123456789",
    //         account_holder_type : data.account_holder_type
    //         },
    //     }
    );
}

paymentquery.createProduct = async function(data){
    return await stripe.products.create({
      name: data.name,
      description: data.description,
      shippable:data.shippable
    });
}

paymentquery.createPriceForProduct = async function(data){
    return await stripe.prices.create({
      unit_amount: data.unit_amount,
      currency: 'inr',
      recurring: {interval: 'month'},
      product: data.productID,
      type:data.type
    });
}

paymentquery.listOfProduct = async function(limit){
    return await stripe.products.list({
      limit: limit,
    });
}

paymentquery.listOfPrices = async function(limit){
    return await stripe.prices.list({
      limit: limit,
      active : true
    });
}

paymentquery.createCardToken = async function(data){
    const token = await stripe.tokens.create({
        card: {
        number: data.number,
        exp_month: data.exp_month,
        exp_year: data.exp_year,
        cvc: data.cvc,
        },
    });
    return token;
}

paymentquery.cardPayment = async function(data){
    return await stripe.charges.create({
      amount: data.amount,
      currency: 'inr',
      source: data.source, //// token 
      description: data.description,
    });
}

paymentquery.deleteCustomer = async function(id){
    return await stripe.customers.del(id);
}

paymentquery.deleteAccount = async function(id){
    return await stripe.accounts.del(id);
}

paymentquery.createCard = async function(id,source){
    return  await stripe.customers.createSource(
      id,
      {source: source}
    );
}

paymentquery.makeSplitPayment = async function(data){
    return stripe.charges.create({
        
      amount: data.amount*100,
      currency: 'INR',
      customer: data.customerId,
      transfer_data: {
            amount: ((data.amount * 60) / 100) * 100,
            destination: data.accountId,
        },
      description: 'My First Test Charge ',

    });
}

paymentquery.retrieveAccount = async function(id){
    return  await stripe.accounts.retrieve(id);
}

paymentquery.subscription = async function(data){
    return await stripe.subscriptions.create({
      customer: data.customer,
      items: [
        {price: data.priceId}
      ],
    });
},

paymentquery.getAllCards = async function(id){
    return await stripe.customers.listSources(
      id,
      {object: 'card', limit: 3}
    );
}


module.exports = paymentquery;