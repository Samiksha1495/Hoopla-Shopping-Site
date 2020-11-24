var express = require('express');
var routing = express.Router();

var busLog = require('../public/javascripts/buslogic.js');

routing.get('/cart/:uEmail', function(req, res, next){
    busLog.getDetails(req.params.uEmail).then(function(result){
        res.json(result)
    }).catch(function (err) {
        next(err);
    })
})

routing.post('/checkoutInsert', function(req, res, next){
    busLog.insertDetails(req.body).then(function(result){
        res.json(result)
    }).catch(function(err){
        next(err);
    })
})
routing.get('/getProducts/:p_Id', function(req, res, next){
    busLog.getProductDetails(req.params.p_Id).then(function(resu){
        console.log("in routes ", resu)
        res.json(resu)
    }).catch(function(err){
        next(err);
    })
})

routing.post('/checkoutFetch', function(req, res, next){
    console.log(req.body);
    busLog.findDetails(req.body).then(function(result){
        res.json(result)
    }).catch(function(err){
        next(err);
    })
})
routing.delete('/deleteCart/:email/:pid', function(req, res, next){
    console.log(req.params.email+" "+req.params.pid)
    busLog.deleteproduct(req.params.email, req.params.pid).then(function(result){
        res.json(result)
    })
    .catch(function(err){
        next(err)
    })
})

routing.post('/emptyCart', function(req, res, next){
    busLog.emptyCart(req.body)
    .catch(function(err){
        next(err)
    })
})

routing.post('/cancelOrder', function(req, res, next){
    console.log(req.body)
    busLog.cancelOrder(req.body).then(function(result){
        res.json(result)
    })
    .catch(function(err){
        next(err)
    })
})


routing.post('/addToCart', function(req, res, next){
    var product = req.body
    // console.log("routing"+product);
    console.log("inside"+product)
    return busLog.addProductToCart(product).then(function(items){
        res.json({"message":"Product successfully added to cart "+items});
    }).catch(function(err){
        next(err);
    });
});

routing.post('/updateQuantity', function(req, res, next){
    console.log(req.body)
    busLog.update(req.body.email, req.body.quantity, req.body.productID).then(function(result){
        res.json(result)
    })
    .catch(function(err){
        next(err)
    })
})

routing.post('/updateCheckOut', function(req, res, next){
    console.log(req.body)
    busLog.updateCheckOut(req.body).then(function(result){
        res.json(result)
    })
    .catch(function(err){
        next(err)
    })
})

routing.get('/getadmin/:from/:to', function(req,res,next){
    console.log(req.params.from);
    console.log(req.params.to);
    busLog.adminData(req.params.from,req.params.to).then(function(result){
        res.json(result)
    })
    .catch(function(err){
        next(err);
    })
})





module.exports = routing;
