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

app.get( '/api/square', (request, response, next) => {
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

/* Third route
  request: POST /api/compute
  request body params: {"operator": "+",
                        "operands": [3,4]}
  request content type: application/json
  response: {"result": 7}
  
  
  request: POST /api/compute
  request body params: {"operator": "/",
                        "operands": [5,3]}
  response: {"result": 1.67}
  request content type: application/json
  
  
  request: POST /api/compute
  request body params: {"operator": "?",
                        "operands": [5,3]}
  request content type: application/json
  response: {"error": "invalid operator ?. Valid operators are /, +, -, *"}
  response content type: application/json
  response status code: 404 */

app.post( '/api/compute', (request, response, next) => {
  console.log( '---===request.body===---', request.body ); 
  const { operator, operands } = request.body
  console.log( '---===operands===---', operands ); 
  console.log( '---===operator===---', operator ); 
  let num1 = parseInt(operands[0])
  let num2 = parseInt(operands[1])
  let finalResult = ""
  if ( operator !== "+" || "-" || "*" || "/") {
    response.status( 404) 
    .send(
      `error: invalid operator ${operator}. Valid operators are /, +, -, *`
    )
  } else {
      if ( operator === "+") {
        finalResult = num1 + num2
      }
      if ( operator === "-") {
        finalResult = num1 - num2
      }
      if ( operator === "*") {
        finalResult = num1 * num2
      }
      if ( operator === "/") {
        finalResult = num1 / num2
      }

    response.json({
      Result: finalResult.toFixed(2)
    })
  }
})

app.listen(3000, function () {
  console.log( '<3333333 listening on 3000 <3333333' )
})