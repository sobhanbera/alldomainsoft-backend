const {FAILED, DefaultResponseData} = require("../constants")

/**
 * this function is a helper function for sending data to client
 *
 * @param {Response} res the express.js response
 * @param {Object} data the data to send to client
 */
function sendResponse(res, data = {}, code = FAILED, message = "") {
    res.json({
        ...DefaultResponseData,
        data,
        code,
        message,
    })
}

module.exports = {
    sendResponse,
}
