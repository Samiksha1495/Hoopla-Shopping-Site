var express = require('express');
var router = express.Router();

var productBL= require('../public/javascripts/productsBL.js')


// not used yet
router.get('/getAllProduct', function(req, res, next) {
  console.log("request recived for get all product")
  return productBL.getAllProducts().then(function(products){
    res.json(products);
  }).catch(function(err){
    next(err);
  });
});

router.get('/getAllCategories', function(req, res, next){
  return productBL.getAllCategories().then(function(categories){
    if(categories==null || categories.length==0) {
      throw new Error("Categories are unavailable.");
    }
    res.json(categories);
  }).catch(function (err) {
    next(err);
  });
})

router.get('/getProductBy/:productId', function(req, res, next) {
  var pId=req.params.productId.toString();
  console.log(pId)
  return productBL.getProductById(pId).then(function(product){
    if(product==null) {
      throw new Error("Product details are unavailable.");
    }
    res.json(product)
  }).catch(function(err){
    next(err);
  });
  
});

router.get('/getProductByCategory', function(req, res, next) {
  var category=req.query.category;
  console.log(category);
  return productBL.getProductByCategory(category).then(function(products){
    if(products==null || products.length==0) {
      throw new Error("No products found for the searched category.")
    }
    res.json(products)
  }).catch(function(err){
    next(err);
  });
});

router.get('/getProductByName', function(req, res, next) {
  var pName=req.query.pName;
  console.log(pName)
  return productBL.getProductByName(pName).then(function(products){
    console.log("123425")
    if(products==undefined || products.length==0) {
     console.log(products)
      throw new Error("No products found for the searched keyword.")
    }
    res.json(products);
  }).catch(function(err){
    next(err);
  });
});

router.post('/updateProduct', function(req, res, next){
    return productBL.updateProduct(req.body).then(function(details){
      res.json(details);
    }).catch(function(err){
      next(err);
    });
});

router.post('/updateOrder', function(req, res, next){
  return productBL.updateOrder(req.body).then(function(details){
    res.json(details);
  }).catch(function(err){
    next(err);
  });
});


module.exports = router;
