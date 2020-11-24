var productDAL = require('./productDAL');
var products=require("./products.js");

var productBL = {};

productBL.getProductById=function(id){
    console.log(id)
return productDAL.getProductById(id).then(function(collection){
    if (collection == null) {
        throw new Error("Product not found")
    }
    else {
        return products.toObject(collection);
    }
})
}
productBL.getProductByCategory=function(category){
    
return productDAL.getProductByCategory(category).then(function(collection){
    if (collection == null) {
        throw new Error("Product not found")
    }
    else {
        return collection;
    }
});
}

productBL.getProductByName=function(name){
    console.log(name)
    return productDAL.getProductByName(name).then(function(collection){
        if(collection!=null){
            return collection;
        }
    })
}

productBL.updateProduct = function(product){
    var idArr=[];
    var quantityArr=[];
    var prod=product.uCart
    console.log(prod)
    for(let i=0;i<prod.length;i++){
        idArr.push(prod[i].p_Id);
        quantityArr.push(prod[i].pQuantity);        
    }
    return productDAL.findProductqty(idArr, quantityArr).then(function(collection){
        console.log(collection)
        if(collection == null){
            throw new Error("Quantity is greater than Stock")
        }else{
            for(let i=0;i<idArr.length;i++){
                console.log(i)
                    productDAL.updateProduct(idArr[i], quantityArr[i]).then(function(result){
                        // for loop  
                })
            }
        }
    })
}

productBL.updateOrder = function(product){
    return productDAL.updateOrder(product).then(function(collection){
        if (collection == null) {
            throw new Error("Update not processed")
        }
        else {
            return collection;
        }
    })
}

module.exports = productBL 
