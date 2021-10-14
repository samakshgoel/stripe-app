const paymentquery = require('../../model/stripequeries/stripequeries');

module.exports = {

    async createAccount(req,res){
        Data = req.body
        console.log("Show the given Data ",Data)
        if(!Data) return res.status(422).send({code:422,status:'failed',msg:"Data is missing"});

        try{
            let createData = await paymentquery.createAccountForUser(Data);
            console.log("Response at the time of creating account",createData);
            return res.status(200).send({code:200,status:'success',Response:createData});
        }catch(err){
            console.log("error for creating customer account:",err)
            return res.status(422).send({code:422,status:'failed',msg:err.message});
        }

    },

    async createCardToken(req,res){
        let data = req.body;
        try{
            let token = await paymentquery.createCardToken(data);
            return res.status(200).send({ code:200, status: 'success', data:token});
        }catch(err){
            return res.status(422).send({ code:422, status: 'Failed', msg : err.message });
        }
    },

    async createCustomer(req,res){
        let email = req.body.Email;
        if(!email) return res.status(422).send({ code:422, status: 'Failed', msg : "Email not found" });
        try{
            const customer = await paymentquery.createCustomer(email)
            console.log("customer kaha hai ",customer)
            return res.status(200).send({ code:200, status: 'Failed', data:customer});
        }catch(err){
            console.log("error is ::",err)
            return res.status(422).send({ code:422, status: 'Failed', msg : err.message });
        }
    },

    async createCard(req,res){
        let id = req.body.id;
        let token = req.body.token;

        try{
            let createCard = await paymentquery.createCard(id,token);
            console.log("Card is created now , ",createCard)
            return res.status(200).send({code:200,status:"success",data:createCard});

        }catch(err){
            console.log(err)
            return res.status(422).send({ code:422, status: 'Failed', msg : err.message });
        }
    },

    async makePayment(req,res){
        let data = req.body.Data;

        if(!data) return res.status(422).send({ code:422, status: 'Failed', msg : "Data is required"});

        try{
            let paymentDone = await paymentquery.makeSplitPayment(data);
            console.log("Card is created now , ",paymentDone);
            return res.status(200).send({code:200,status:"success",data:paymentDone});
        }catch(err){
            console.log("err is :",err);
            return res.status(422).send({ code:422, status: 'Failed', msg : err.message });
        }
    },

    async accountList(req,res){
        let limit = req.body.limit;
        if(!limit) return res.status(422).send({code:422,status:"failed",msg:"limit is missing"})
        try{
            let list = await paymentquery.getAllAcountList(limit);
            console.log("list is here::",list);
            return res.status(200).send({code:200,status:"success",data:list});

        }catch(err){
            console.log("error is ::",err)
            return res.status(422).send({code:422,status:'failed'})
        }
    },

    async updateAccount(req,res){
        let data = req.body;
        if(!data) return res.status(422).send({code:422,status:'failed',msg:'Data is missing'});

        try{
            let updatedData = await paymentquery.updateAccountInfo(data);
            console.log("updated data for ",updatedData);
            return res.status(200).send({code:200,status:'success',data:updatedData});
        }catch(err){
            console.log("error in update Account:",err)
            return res.status(422).send({code:422,status:'failed',msg:err.message});
        }
    },

    async createProduct(req,res){
        let data = req.body;
        if(!data) return res.status(422).send({code:422,status:'failed',msg:"Data is required"});

        try{
            let product = await paymentquery.createProduct(data);
            console.log("lets take a look ",product);
            return res.status(200).send({code:200,status:'success',data:product});
        }catch(err){
            console.log("error in creating product is ",product);
            return res.status(422).send({code:422,status:'success',msg : err.message});
        }
    },
    
    async createPriceForProduct(req,res){
        let data = req.body;
        if(!data) return res.status(422).send({code:422,status:'failed',msg:'Data is required'});

        try{
            let price = await paymentquery.createPriceForProduct(data);
            console.log("lets see the price ", price);
            return res.status(200).send({code:200,status:'success',data:price})
        }catch(err){
            console.log("error in creating price is :",err);
            return res.status(422).send({code:422,status:'failed',msg:err.message});
        }

    },

    async productList(req,res){
        let limit = req.body.limit;
        if(!limit) return res.status(422).send({code:422,status:"failed",msg:"limit is missing"});

        try{
            let list = await paymentquery.listOfProduct(limit);
            console.log("list of the product is ",list);
            return res.status(200).send({code:200,status:"success",data:list})
        }catch(err){
            console.log("error in product list api is ",err)
            return res.status(422).send({code:422,status:"failed",msg:err.message});
        }
    },

    async priceList(req,res){
        let limit = req.body.limit;
        if(!limit) return res.status(422).send({code:422,status:"failed",msg:"limit is missing"});

        try{
            let list = await paymentquery.listOfPrices(limit);
            console.log("list of the price is ",list);
            return res.status(200).send({code:200,status:"success",data:list})
        }catch(err){
            console.log("error in price list api is ",err)
            return res.status(422).send({code:422,status:"failed",msg:err.message});
        }
    },


    async cardPayment(req,res){
        let data = req.body;
        if(!data) return res.status(422).send({code:422,status:"failed",msg:"Data is required"});

        try{
            let payment = await paymentquery.cardPayment(data);
            console.log("list of the price is ",payment);
            return res.status(200).send({code:200,status:"success",data:payment})
        }catch(err){
            console.log("error in card payment api is :",err)
            return res.status(422).send({code:422,status:"failed",msg:err.message});
        }
    },

    async deleteCustomer(req,res){
        let id = req.body.id;
        if(!id) return res.status(422).send({code:422,status:"failed",msg:"id is missing"});

        try{
            let deletedCustomer = await paymentquery.deleteCustomer(id);
            console.log("list of the price is ",deletedCustomer);
            return res.status(200).send({code:200,status:"success",data:deletedCustomer})
        }catch(err){
            console.log("error in delete Customer api is ",err)
            return res.status(422).send({code:422,status:"failed",msg:err.message});
        }
    },

    async deleteAccount(req,res){
        let id = req.body.id;
        if(!id) return res.status(422).send({code:422,status:"failed",msg:"ID is required"});

        try{
            let deletedAccount = await paymentquery.deleteAccount(id);
            console.log("Deleted account ",deletedAccount);
            return res.status(200).send({code:200,status:"success",data:deletedAccount}) 
        }catch(err){
            console.log("error for deleting account is :",err)
            return res.status(422).send({code:422,status:"failed",msg:err.message});
        }
    },

    async retrieveAccount(req,res){
        let id = req.body.id;
        if(!id) return res.status(422).send({code:422,status:"failed",msg:"ID is required"});

        try{
            let retrievedAccount = await paymentquery.retrieveAccount(id);
            console.log("Retrieved Account",retrievedAccount);
            return res.status(200).send({code:200,status:"success",data:retrievedAccount}) 
        }catch(err){
            console.log("error for retrieving account is :",err)
            return res.status(422).send({code:422,status:"failed",msg:err.message});
        }
    },

    async subcribeProduct(req,res){
        let data = req.body;
        if(!data) return res.status(422).send({code:422,status:'failed',msg:'Data is required'});

        try{
            let subscribe = await paymentquery.subscription(data);
            console.log("Deleted account ",subscribe);
            return res.status(200).send({code:200,status:"success",data:subscribe})
        }catch(err){
            console.log("error in subscribe product ",err);
            return res.status(422).send({code:422,status:'failed',msg:err.message});
        }

    }


}