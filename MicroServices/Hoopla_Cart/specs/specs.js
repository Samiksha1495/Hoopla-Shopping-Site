var db = require('../public/javascripts/mongodriver');

describe('Cart suite:', function(){
    it('Retrive by email', function(){
        expect(db.retriveDocuments).toBeDefined()
    })

    it('Should update cart', function(){
        expect(db.updateValues).toBeDefined()
    })

    it('Should  cart', function(){
        expect(db.updateValues).toBeDefined()
    })
})

