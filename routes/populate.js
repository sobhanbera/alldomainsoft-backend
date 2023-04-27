const router = require("express").Router()
const mysql = require("mysql")
const {default: axios} = require("axios")

const {
    DATABASE_NAME,
    DATABASE_HOST,
    DATABASE_PASSWORD,
    DATABASE_USER,
    DATA_SOURCE_URL,
    SUCCESS,
    FAILED,
    DATA_NOT_FOUND,
    PARTIAL_SUCCESS,
    CSV_DATA_SOURCE_URL,
} = require("../constants/index.js")
const {sendResponse} = require("../utils/index.js")

/*
 * here we are creating a new database connection
 * by providing local db's configs
 */
const database = mysql.createConnection({
    host: DATABASE_HOST,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
})

/**
 * task for this route:
 * It will get data from the url: https://jsonplaceholder.typicode.com/comments and store it in database
 * It will get csv file from url and save the csv file locally, then read the data from local .csv file and save it in same database. csv file location: http://console.mbwebportal.com/deepak/csvdata.csv
 * Optional (For extra points): Do same steps for a big data file located at: http://console.mbwebportal.com/deepak/bigcsvdata.csv
 */
router.get("/", (request, response) => {
    const loadDataFromCSV = request.headers.getfromcsv || ""

    axios
        .get(loadDataFromCSV ? CSV_DATA_SOURCE_URL : DATA_SOURCE_URL)
        .then(res => {
            // we have recieved some data
            if (res.data.length > 0) {
                console.log("FROM CSV")
                // now let's create a single query to insert all the data into the db
                // let query =
                //     "INSERT INTO posts (postid, id, name, email, body) VALUE ";
                // const data = res.data;

                // for (let i in data) {
                //     const { postId, id, name, email, body } = data[i];

                //     query += `(${postId}, ${id}, "${name}", "${email}", "${String(
                //         body
                //     )}")`;

                //     if (i !== data.length - 1) query += ", ";
                // }

                let gotError = false

                if (loadDataFromCSV) {
                    // we can use some modules here to parse the csv file
                    // but since it is a simple csv, let's create our own parser
                    // console.log(res.data[100]);

                    // see the data is divided in 5 fields
                    // 0, 5, 10
                    const data = res.data.split("\r\n")
                    // the first row is the fields name, so let's starts from 2nd row
                    for (let i = 1; i < data.length; i++) {
                        const actualData = data[i].split(",")
                        // console.log(actualData);
                        // data.postId, data.name

                        database.query(
                            "INSERT INTO posts (postid, id, name, email, body) VALUE (?, ?, ?, ?, ?)",
                            [
                                actualData[0],
                                actualData[1],
                                actualData[2],
                                actualData[3],
                                actualData[4],
                            ],
                            (err, res) => {
                                if (err) {
                                    console.log(err)
                                    gotError = true
                                }
                            },
                        )

                        if (gotError) break
                    }
                } else {
                    // it seems that the data is very big for a single query to hold
                    // so for now let's go with separate query for every data object
                    const data = res.data

                    for (let i in data) {
                        const {postId, id, name, email, body} = data[i]

                        database.query(
                            "INSERT INTO posts (postid, id, name, email, body) VALUE (?, ?, ?, ?, ?)",
                            [postId, id, name, email, body],
                            (err, res) => {
                                if (err) {
                                    console.log(err)
                                    gotError = true
                                }
                            },
                        )

                        if (gotError) {
                            break
                        }
                    }
                }

                if (gotError) {
                    sendResponse(response, {}, PARTIAL_SUCCESS)
                } else {
                    sendResponse(response, {}, SUCCESS)
                }
            } else {
                // else we haven't recieved any data
                // and send a fallback response to the client
                sendResponse(response, {}, DATA_NOT_FOUND)
            }
        })
        .catch(err => {
            console.log("ERROR GETTING DATA IN POPULATE", err)
            sendResponse(response, {}, FAILED)
        })
})

module.exports = router
