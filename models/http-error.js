class HTTPError extends Error{
    constructor(message,errorCode){

        super(message); // get 'message' property
        this.code = errorCode
    }
}
module.exports = HTTPError;