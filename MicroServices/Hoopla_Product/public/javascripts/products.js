var products=function(_id, pName, pDescription, pRating, pCategory, price, color, image, specification,
    dateFirstAvailable, dateLastAvailable, pSeller){
this._id=_id;
this.pName=pName;
this.pDescription=pDescription;
this.pRating=pRating;
this.pCategory=pCategory;
this.price=price;
this.color=color;
this.image=image;
this.specification=specification;
this.dateFirstAvailable=dateFirstAvailable;
this.dateLastAvailable=dateLastAvailable;
this.pSeller=pSeller
}

products.toObject=function(result){
    return new products(result._id, result.pName, result.pDescription, result.pRating,
        result.pCategory, result.price, result.color, result.image, result.specification,
        result.dateFirstAvailable, result.dateLastAvailable, result.pSeller)
}

module.exports=products