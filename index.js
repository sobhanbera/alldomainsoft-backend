const express = require("express")
const cors = require("cors")

const allRoutes = require("./routes/index.js")
const {PORT} = require("./constants/env.js")

const app = express()

// middlewares
app.use(express.json())
app.use(cors())

// routes
app.use("/", allRoutes) // ? TODO

// server listener
app.listen(PORT, () => {
    console.log(`Listening in port: ${PORT}`)
})
