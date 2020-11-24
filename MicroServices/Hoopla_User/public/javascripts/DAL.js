var MongoClient = require('mongodb');
var connUrl = "mongodb://localhost:27017/hoopla";
var collectionName = 'Hoopla_users';

var hooplaUserDAL={};


hooplaUserDAL.userLogin = function(uEmail, uPass) {
  return MongoClient.connect(connUrl).then(function (client) {

    var collect=client.db().collection(collectionName);
    return collect.find({"uCredentials.uEmail":uEmail, "uCredentials.uPass":uPass}).toArray().then(function(data) {
      if(data.length == 1){
        return collect.findOneAndUpdate({"uCredentials.uEmail":uEmail}, 
          {$set:{"uProfile.uLastLogin":new Date()}}, {returnOriginal:false, upsert:false}).then(function(data) {
          return data; 
        });
      }
      else {
        throw new Error("Invalid credentials, please retry with correct credentials!"); 
      }
    });
  });
  client.close();
}


// logoutUser
// below method is not used
hooplaUserDAL.userLogout = function(newUser){
  return MongoClient.connect(connUrl).then(function (client) {
    var collection=lient.db().collection(collectionName);
    return collection.find(newUser).then(function(data) {
      return data;
    });
  });
  client.close();

}

hooplaUserDAL.userRegister = function(uCredentials, uProfile, uCart, uAddress){
  return MongoClient.connect(connUrl).then(function(client){
    var collection = client.db().collection(collectionName);
    return collection.find({"uCredentials.uEmail":uCredentials.uEmail}).toArray().then(function(item){
      if(item.length==0){
    return collection.insert({
      "uCredentials": uCredentials,
      "uProfile": uProfile,
      "uCart": uCart,
      "uAddress": uAddress
    }).then(function(final){
      return final;
    });
  }
  else {
    throw new Error("Use another Email");
  }
})
  })
  client.close();
}

hooplaUserDAL.userEmail = function(uEmail){
  return MongoClient.connect(connUrl).then(function(client){
    var collection = client.db().collection(collectionName);
    return collection.find({"uCredentials.uEmail":uEmail}).toArray().then(function(value){
      console.log(value)
      return value;
    });
  });
  client.close();
}


// hooplaUserDAL.getUserDetails=function(uEmail){
//   return MongoClient.connect(connUrl).then(function(client){

module.exports = hooplaUserDAL;




