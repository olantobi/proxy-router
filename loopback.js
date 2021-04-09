const http = require('http')

const server = http.createServer(function(request, response) {
  console.dir(request.param)

  if (request.method == 'POST') {
    console.log('POST')
    var body = ''
    request.on('data', function(data) {
      body += data      
    })
    request.on('end', function() {
      console.log('Body: ' + body)
      response.writeHead(200, {'Content-Type': 'application/json'})
      response.end(body)
    })
  } else {
    console.log('GET')
    response.writeHead(200, {'Content-Type': 'application/json'})
    response.end(JSON.stringify({'message': 'Ok', 'status': 'Successful'}))
  }
})

const port = 3000
server.listen(port)
console.log(`Listening at http://:${port}`)