const cors = require('cors')
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const express = require('express');
const port = process.env.PORT || 3000
const app = express()
const router = require('./routers')
const errorHandler = require('./middleware/errorHandler');

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors())

app.use(router)

app.use(errorHandler)

app.listen(port, () => console.log("Success run on port", port))

module.exports = app