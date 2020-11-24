var db = require('./DAL');
var busLog = {};
errorObject= new Error();




busLog.loginUser = function(userName, pass){
  return db.userLogin(userName, pass).then(function(item) {
    console.log('Length IS', item);
    return item; 
  })
}



busLog.logoutUser = function(){
  return db.userLogout().then(function(item) {
    
    if(item.insertedCount == 1){
      console.info('The promise was fulfilled!', item);
      return item.ops[0];
    }
     else {
      throw new Error("The data is not available"); }
  
  })
}

busLog.registerUser = function(uCredentials, uProfile, uCart, uAddress){
  return db.userRegister(uCredentials, uProfile, uCart, uAddress).then(function(item){
    if(item.insertedCount ==1 ){
      return "user successfully registered"
    } else{
      throw new Error("The data cannot be inserted");
    }
  })
}

busLog.getUserEmail = function(uEmail){

  return db.userEmail(uEmail).then(function(mail){
    console.log(mail)
    return mail
  })
}

// busLog.getUserDetails=function(uEmail){
//   return db.getUserDetails(uEmail).then(function(data){
//     return data
//   })
// }



module.exports = busLog;  
