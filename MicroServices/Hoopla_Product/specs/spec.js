var db=require('../public/javascripts/productDAL');

describe('Product Suite:', function(){
    it('Product by category',function(){
        expect (db.getProductByCategory ('Electronics')).toBeDefined();
    });
    it('search product',function(){
        expect (db.getProductByName('asus')).toBeDefined();
    })
})