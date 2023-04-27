const dotenv = require("dotenv")
dotenv.config()

// here are database configs that is located locally currently
const DATABASE_HOST = process.env.DATABASE_HOST
const DATABASE_NAME = process.env.DATABASE_NAME // this will be replaced soon
const DATABASE_USER = process.env.DATABASE_USER
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD

const PORT = process.env.PORT

module.exports = {
    DATABASE_HOST,
    DATABASE_NAME,
    DATABASE_USER,
    DATABASE_PASSWORD,

    PORT,
}
