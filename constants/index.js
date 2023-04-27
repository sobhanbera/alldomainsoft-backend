// this file contains all the constants
const envs = require("./env")
const responsecodes = require("./responsecodes")

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/comments"
const CSV_DATA_SOURCE_URL = "http://console.mbwebportal.com/deepak/csvdata.csv"

module.exports = {
    DATA_SOURCE_URL,
    CSV_DATA_SOURCE_URL,
    ...envs,
    ...responsecodes,
}
