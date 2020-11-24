export class Product {
    '_id': string;
    'pName': string;
    'pDescription': string;
    'pRating': number;
    'pCategory': string;
    'price': number;
    'color': string;
    'image': string;
    'specification': string;
    'dateFirstAvailable': Date;
    'dateLastAvailable': Date;
    'pSeller': {
        's_Id': string;
        'pDiscount': number;
        'pQuantity': number;
        'pShippingCharges': number;
    };
}
