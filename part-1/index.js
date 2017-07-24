const express = require('express') 
const app = express()
const bodyParser = require('body-parser')

app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({ extended: true }) )

app.get('/', (request, response, next) => {
  response.json({ "Greeting": "WELCOME TO MATH" })
})

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

// // Second route
// request: GET /api/square?number=10.5
// response: {"result": 110.25}
// request content type: application/json

app.get( '/api/square', function (request, response, next) {
  const req = request.query
  const result = Math.pow( req.number, 2 )
  console.log( '---===number===---', result); 
  if ( req.number ) {
      response.json({
      "result": result
    })
  } else {
    response.json({
      message: "No number provided."
    })
  }
})

app.listen(3000, function () {
  console.log( '<3333333 listening on 3000 <3333333' )
})