const routes = require("express").Router()

routes.use("/populate", require("./populate"))
routes.use("/search", require("./search"))

module.exports = routes
