/*
 * This is a service class used across all the components
 * 
 * this provides the url for server side applications to all the 
 * http calls in the service classes
 *
 * 
 */
export class UriService {

    //alterHost="myshec88866l"
    /** productMicroService properties */
    productMicroServiceUri = {
        protocol: 'http',
        host: "localhost",
        port: '8000',
        applicationName: ''
    };

    /** userMicroServiceUri properties */
    userMicroServiceUri = {
        protocol: 'http',
        host: "localhost" /* 'vjeemys-09'  */ ,
        port: '7000',
        applicationName: ''
    };

    /** cartMicroServiceUri properties */
    cartMicroServiceUri = {
        protocol: 'http',
        host: "localhost" ,
        port: '9000',
        applicationName: ''
    };
   

    /**
     * This function builds the uri required for accessing the various MicroServices
     */
    buildProductsMicroServiceUri() { 
        return this.productMicroServiceUri.protocol + 
            "://" + this.productMicroServiceUri.host + 
            ":" + this.productMicroServiceUri.port + 
            "/" + this.productMicroServiceUri.applicationName;
    }

    buildUserMicroServiceUri() {
        return this.userMicroServiceUri.protocol + 
            "://" + this.userMicroServiceUri.host + 
            ":" + this.userMicroServiceUri.port + 
            "/" + this.userMicroServiceUri.applicationName;
    }

    buildCartMicroServiceUri() {
        return this.cartMicroServiceUri.protocol + 
            "://" + this.cartMicroServiceUri.host + 
            ":" + this.cartMicroServiceUri.port + 
            "/" + this.cartMicroServiceUri.applicationName;
    }

    


}