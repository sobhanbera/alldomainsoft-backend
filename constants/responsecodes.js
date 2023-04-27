// response code for the api endpoints
const SUCCESS = "SUCCESS"
const FAILED = "FAILED"
const PARTIAL_SUCCESS = "PARTIAL_SUCCESS"
const DATA_NOT_FOUND = "DATA_NOT_FOUND"

// a default response which will be overwritten before sending the actual response
const DefaultResponseData = {
    code: FAILED,
    message: "",
    data: {},
}

module.exports = {
    // response code for the api endpoints
    SUCCESS,
    FAILED,
    PARTIAL_SUCCESS,
    DATA_NOT_FOUND,
    DefaultResponseData,
}
