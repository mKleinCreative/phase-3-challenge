const express = require('express') 
const app = express()
const bodyParser = require('body-parser')
const router = express.Router()

app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({ extended: true }) )

// // First route
// request: GET /api/supported-operations
// response: {"/": "division",
//            "+": "addition",
//            "-": "subtration",
//            "*": "multiplication"}
// response content-type: application/json

app.get( '/api/supported-operations', (request, response, next) => {
  response.json({
    "/": "division",
    "+": "addition",
    "-": "subtration",
    "*": "multiplication"
  })
})


app.listen(3000, function () {
  console.log( '<3333333 listening on 3000 <3333333' )
})