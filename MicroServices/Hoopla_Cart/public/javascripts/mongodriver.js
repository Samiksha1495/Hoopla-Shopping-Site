var MongoClient = require('mongodb');
var nodeUtil = require('util');
var url = "mongodb://localhost:27017/hoopla";
var busLog = require('./buslogic');

var userCollectionName = "Hoopla_users";
var productsCollectionName = "products";

var checkoutCollectionName = "checkout";
var productArray = []
var productBusinessDAL = {};

var conn = MongoClient.connect(url)

productBusinessDAL.retriveDocuments = function (email) {
    return conn.then(function (mongoClientInstance){ 
        var dataBase = mongoClientInstance.db();
        var collection = dataBase.collection(userCollectionName);
        return collection.findOne({ "uCredentials.uEmail": email }, { fields: { uCart: 1, _id: 1  } })
            .then(function (resultout) {
                if (!resultout) {
                    console.log("Error")
                    throw new Error("error occured");
                }
                else {
                    console.log(resultout)
                    return resultout;
                }
            })
    })
}


productBusinessDAL.insert = function(data, id){
    return conn.then(function(mongoClientInstance){
        var dataBase = mongoClientInstance.db();
        var collection = dataBase.collection(checkoutCollectionName);
        return collection.insert({"orderId":id, "amount":data.amount, "uCart":data.uCart, "date":data.date, "email":data.email, "modified":""}).then(function(result){
            if (result.insertedCount==0) {
                return null;
            }
            else{
                return result;
            }
        })
    })
}
productBusinessDAL.retriveData = function(prodId){
    return conn.then(function (mongoClientInstance){
        var dataBase = mongoClientInstance.db();
        var collection = dataBase.collection(productsCollectionName);
        return collection.findOne({_id:prodId}, {})
        .then(function(result){
            if(!result){
                console.log("Error in fetching details");
            }
            else{
                console.log( "in dal", result);
                return result
            }
        })
    })
}

productBusinessDAL.find = function(email){
    return conn.then(function(mongoClientInstance){
        var dataBase = mongoClientInstance.db();
        var collection = dataBase.collection(checkoutCollectionName);
        return collection.find({"email":email.email}).toArray().then(function(result){
            if (result.length==0) {
                return null;
            }
            else{
                console.log(result)
                return result;
            }
        })
    })
}

productBusinessDAL.delete=function(email, pid){
    return MongoClient.connect(url).then(function(conn){
        var database=conn.db()
        var collection=database.collection(userCollectionName)
        return collection.update({"uCredentials.uEmail":email}, {$pull: {"uCart": {"p_Id":String(pid)}}})
        .then(function(res){
            if(res.result.nModified==1){     
                console.log("successfully deleted")
                return "Successfully deleted"
            }
            else{
                console.log("Not Deleted")
            } 
    })
})
}

productBusinessDAL.deletecart=function(email, pid){
    return MongoClient.connect(url).then(function(conn){
        var database=conn.db()
        var collection=database.collection(userCollectionName)
        return collection.update({"uCredentials.uEmail":email}, {$set: {"uCart": [] }})
        .then(function(res){
            if(res.result.nModified==1){     
                return "Successfully deleted"
            }
            else{
                console.log("Not Deleted");
            } 
    })
})
}

productBusinessDAL.updateValues = function(email, quantity, productId){
    return MongoClient.connect(url).then(function(conn){
        var database=conn.db()
        var collection=database.collection(userCollectionName)
        return collection.findOne({ "uCredentials.uEmail": email }, { fields: { uCart: 1, _id: 1  } })
            .then(function (resultout) {
                if (!resultout) {
                    console.log("Error");
                }
                else {
                    console.log(resultout.uCart.length)
                    for(var i=0;i<resultout.uCart.length;i++){
                        if(resultout.uCart[i].p_Id==productId){
                        return collection.update({"uCredentials.uEmail":email, ["uCart."+i+".p_Id"]:productId}, {$set:{["uCart."+i+".pQuantity"]:quantity}})
                            .then(function(res){
                                if(res.result.nModified==1){
                                    console.log("success");
                                    return "success"
                                }
                                else{
                                    console.log("not found");
                                }
                                
                            })
                    }
                }
                }
            })
            }
    )}


productBusinessDAL.cancel = function(data){
    return conn.then(function(mongoClientInstance){
        var dataBase = mongoClientInstance.db();
        var collection = dataBase.collection(checkoutCollectionName);
        console.log(data.orderId)
        return collection.deleteOne({"orderId":data.orderId}, { $set :{}}).then(function(result){
            if(result.deletedCount != 1){
                throw new Error("Cant cancel Order")
            }
        })
    })
}

productBusinessDAL.updateCheckOut = function(data){
    return conn.then(function(mongoClientInstance){
        var dataBase = mongoClientInstance.db();
        var collection = dataBase.collection(checkoutCollectionName);
        console.log(data.orderId)
        return collection.findOne({"orderId":data.orderId}).then(function(result){
            if (!result) {
                console.log("Error no order found")
            }
            else {
                console.log(result.uCart.length)
                for(var i=0;i<result.uCart.length;i++){
                    if(result.uCart[i].p_Id==data.p_Id){
                    var date= new Date();
                    return collection.update({"orderId":data.orderId, ["uCart."+i+".p_Id"]:data.p_Id}, {$set:{["uCart."+i+".pQuantity"]:data.quantity, "amount":data.amount, "modified":date}})
                        .then(function(res){
                            if(res.result.nModified==1){
                                console.log("success")
                                return "success"
                            }
                            else{
                                console.log("not found")
                            } 
                    })
                }
            }
            }
        })

    })
}


productBusinessDAL.addToCart = function(data){
    return conn.then(function(mongoClientInstance){
        var dataBase = mongoClientInstance.db();
        var collection = dataBase.collection(userCollectionName);
        return collection.update({ "uCredentials.uEmail": data.email })
})
}

productBusinessDAL.addProductToCartDAL = function(p){
    console.log(p)
    return MongoClient.connect(url).then(function(connection){
        var database=connection.db()
        var collection=database.collection(userCollectionName)
        return collection.findOne({
            $and:[
                {"uCredentials.uEmail":p["sEmail"]},
                {"uCart.p_Id":p["p_Id"]},
                {fields:{"_id":0, "uCart:pQuantity":1}}
            ] 
        }).then(function(quantity){
            if(quantity==null){
                return MongoClient.connect(url).then(function(conn){
                    var collect=conn.db().collection(userCollectionName);
                    return collection.update({"uCredentials.uEmail":p["sEmail"]}, {$push:{"uCart":{"p_Id":p["p_Id"], "pQuantity":1}}}).then(function(updated){
                        
                        if(updated.result.nModified>0){
                            console.log(updated)
                             return updated
                          } else {
                            throw new Error("unable to add to the cart");
                          }
                })
            })
        }
        else{
            return MongoClient.connect(url).then(function(connection){
                var collect=connection.db().collection(userCollectionName)
                return collection.update(
                    {"userCredentials.uEmail":p["sEmail"], "uCart.p_Id":p["p_Id"]},
                    {$inc:{"uCart.$.pQuantity":1}}
                ).then(function(updateProduct){
                    if(updateProduct.result.nModified>0){
                        console.log(updateProduct)
                        return updateProduct
                    }
                    else{
                        throw new Error ("Invalid Data")
                    }
                })
            })
        }
     })
    
    })
}

productBusinessDAL.getAdminTable = function(from,to){
    return MongoClient.connect(url).then(function(conn){
        var database=conn.db()
        var collection=database.collection(checkoutCollectionName)
        return collection.find({},{fields:{"orderId":1,"amount":1,"email":1,"date":1,"_id":0}}).toArray()
        .then(function(result){
            if(!result){
                return null;
            }
            else{
                console.log(result);
                return result;
            }
            
        })
    })

}
module.exports = productBusinessDAL;