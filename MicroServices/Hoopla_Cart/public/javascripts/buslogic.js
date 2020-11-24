var db = require('./mongodriver.js');
var busLog={};
var cart=[];


busLog.getDetails = function(emailId){
    
    return db.retriveDocuments(emailId)
    .then(function(result){
        console.log(result)
        return result;
    })
}

busLog.generateOrderId = function() {
    var alphabets = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var numbers = "0987654321";
    var result = '';
    for (var i=0; i<1; i++){
        var num = Math.floor(Math.random() * alphabets.length);
        result += alphabets.substring(num, num+1);
    }
    for (var i=0; i<4; i++){
        var num= Math.floor(Math.random() * numbers.length);
        result += numbers.substring(num, num+1);
    }
    return result
}

busLog.insertDetails = function(data){
    var id = busLog.generateOrderId()
    return db.insert(data, id)
    .then(function(result){
        return result
    })
}

busLog.findDetails = function(data){
    return db.find(data)
    .then(function(result){
        return result
    })
}
busLog.getProductDetails = function(prodId){
    return db.retriveData(prodId)
    .then(function(res){
        console.log("in bus", res)
        return res;
    })
}

busLog.deleteproduct = function(email, id){
    return db.delete(email, id)
    .then(function(msg){
        return msg;
    })
}

busLog.cancelOrder = function(data){
    return db.cancel(data)
    .then(function(msg){
        return msg;
    })
}

busLog.addProductToCart = function(p){
    console.log("BL"+p);
    return db.addProductToCartDAL(p).then(function(msg){
      return msg;
    })
  }

busLog.update = function(email, quantity, pId){
    return db.updateValues(email, quantity, pId)
    .then(function(msg){
        return msg;
    })
}

busLog.emptyCart = function(cart){
    var email=cart.email
    var count=0
    return db.deletecart(email)
    .then(function(msg){
        return msg;
        })
    }

busLog.updateCheckOut = function(cart){
    return db.updateCheckOut(cart)
    .then(function(msg){
        return msg;
    })
}

busLog.adminData = function(from,to){
    return db.getAdminTable(from,to)
    .then(function(result){
        if(result == null){
            throw new Error("data not found for admin");
        }
        else{
            return result;
        }
    })
}

module.exports = busLog;