var db = require('../public/javascripts/DAL');

describe('User Suite:', function(){

    it('login',function(){
        expect(db.userLogin("lucky@gmail.com","lucky")).toBeDefined();
    });
    it('detail',function(){
        expect(db.userEmail('"lucky@gmail.com"')).toBeDefined();
    });
})

