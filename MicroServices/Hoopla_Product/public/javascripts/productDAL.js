var connection= require('./connection');

var productCollectionName = 'products';
var hooplaProductDAL={};
hooplaProductDAL.getProductById=function(data){
    return connection.getConnection().then(function(database){
        return database.collection('products').findOne({"_id":data}).then(function(value){
            return value;
        })
    })
}

hooplaProductDAL.getProductByCategory=function(data){
    return connection.getConnection().then(function(database){
        return database.collection('products').find({"pCategory":data}).toArray().then(function(value){
            return value;
        })
    })
}

hooplaProductDAL.getProductByName=function(data){
    return connection.getConnection().then(function(database){
        var re=new RegExp(data, "i")
        return database.collection('products').find({"pName":{$regex:re}}).toArray().then(function(value){
            if(value.length>0){
            return value;
            }
            else{
               return null
            }
        })
    })
}




hooplaProductDAL.findProductqty = function(id, quantity){
    return connection.getConnection().then(function(dataBase){
        var idArr=id;
        var quantityArr=quantity;
        var productCollection = dataBase.collection('products')
        console.log(idArr)
        return productCollection.find({"_id":{ $in : idArr}}).toArray().then(function(products){
            console.log(products)
            for(let j=0;j<products.length;j++){
                if(products[j].pSeller.pQuantity<quantityArr[j]){
                    throw new Error("Quantity is greater than Stock")
                }
            }
            return products
        })
    })
}

hooplaProductDAL.updateProduct = function(id, quantity){
    return connection.getConnection().then(function(dataBase){
        var productCollection = dataBase.collection('products');
            return productCollection.update({"_id":id}, {$inc:{"pSeller.pQuantity":-quantity}}).then(function(detail){
                if(detail.result.nModified>0){
                    return "successfully updated"
                }else{
                    throw new Error("data does not updated")
                }
            })
    })
}

hooplaProductDAL.updateOrder = function(product){
    return connection.getConnection().then(function(dataBase){
        var productCollection = dataBase.collection('products');
        return productCollection.findOne({"_id" : product.p_Id }).then(function(products){
            if(products.pSeller.pQuantity>product.quantity){
                return productCollection.update({"_id":product.p_Id}, {$inc:{"pSeller.pQuantity":-product.quantity}}).then(function(detail){
                    if(detail.result.nModified>0){
                        return productCollection.findOne({"_id":product.p_Id}).then(function(result){
                            return {"price":result.price, "qauntity":result.pSeller.pQuantity, "shipping_charges":result.pSeller.pShippingCharges, "discount":result.pSeller.pDiscount}
                        })
                    }else{
                        throw new Error("data does not updated")
                    }
                })
            }else{
                throw new Error("Quantity is more than stock")
            }
    })
    })
}


module.exports= hooplaProductDAL;