const router = require("express").Router()
const mysql = require("mysql")

const {
    DATABASE_NAME,
    DATABASE_HOST,
    DATABASE_PASSWORD,
    DATABASE_USER,
    FAILED,
    SUCCESS,
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

router.post("/", (request, response) => {
    /**
     * fields needed to search in the database
     * like name, email, body and filters for limiting and sorting data
     */
    const name = request.body.name || ""
    const email = request.body.email || ""
    const body = request.body.body || ""
    const limit = request.body.limit || 1
    const offset = request.body.offset || 25
    const asc = request.body.asc || ""

    console.log(name, email, body, name && email && body)

    if (name || email || body) {
        let query = "SELECT * FROM posts WHERE 1=1"
        if (name) {
            query += ` AND name LIKE '%${name}%'`
        }
        if (email) {
            query += ` AND email LIKE '%${email}%'`
        }
        if (body) {
            query += ` AND body LIKE '%${body}%'`
        }
        query += ` ORDER BY postid`

        database.query(query, [], (err, res) => {
            if (err) {
                sendResponse(response, {}, FAILED)
                console.log(err)
            } else {
                sendResponse(
                    response,
                    {
                        data: res,
                    },
                    SUCCESS,
                )
            }
        })
    } else {
        database.query(
            `SELECT * FROM posts ORDER BY postid ${
                asc ? "ASC" : "DESC"
            } LIMIT ? OFFSET ?`,
            [limit, offset],
            (err, res) => {
                if (err) {
                    sendResponse(response, {}, FAILED)
                } else {
                    sendResponse(
                        response,
                        {
                            data: res,
                        },
                        SUCCESS,
                    )
                }
            },
        )
    }
})

module.exports = router
