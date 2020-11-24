var express = require('express');
var routing = express.Router();

var busLog = require('../public/javascripts/BL.js'); 

//User LOGIN
routing.post('/login', function(req, res, next){
    var uEmail= req.body.uEmail;
    var uPass=req.body.uPass;
    return busLog.loginUser(uEmail, uPass).then(function(item) {
        res.json(item.value);
    }).catch(function (err) {
        next(err);
    });;
});

//User LOGOUT
routing.get('/logout', function(req, res, next){
    var newUser = req.body;
    console.log("User LOGOUT request recieved>", newUser);
    return busLog.logoutUser(newUser).then(function(item) {
        res.json(item);
        res.json({"message":"User logged out successfully"} );
    }).catch(function (err) {
        next(err);
    });
});

//User Register
routing.post('/register', function(req, res, next){
    var credentials = req.body.uCredentials;
    var profile = req.body.uProfile;
    profile.uDateJoined = new Date();
    profile.uIsSeller = false;
    
    var cart = req.body.uCart;
    var address = req.body.uAddress;
    console.log(credentials, profile, cart, address, profile.uDOB);
    return busLog.registerUser(credentials, profile, cart, address, this.uIsSeller, profile.uDOB).then(function(item){
        res.json({'message':item});
    }).catch(function(err){
        next(err);
    })

})

//find User
routing.get('/userDetail', function(req, res, next){
    var mail = req.query.uEmail
    return busLog.getUserEmail(mail).then(function(data){
        res.json({"message":data});
    }).catch(function(err){
        next(err);
    })
})

routing.post('/addToCart', function(req, res, next){
    var product = req.body;
    console.log("routing"+product);
    return busLog.addProductToCart(product).then(function(items){
        res.json({"message":"Product successfully added to cart "+items});
    }).catch(function(err){
        next(err);
    });
});
    

module.exports = routing;


