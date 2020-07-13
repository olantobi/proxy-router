const http = require('http');

http.createServer(function(request, response) {
    // const proxy = http.createClient(9090, 'localhost');
    const proxyRequest = http.request({
        port: 4001,
        host: '127.0.0.1',
        method: request.method,
        path: request.url,
        headers: request.headers,
    });
    proxyRequest.on('response', function (proxyResponse) {
        proxyResponse.pipe(response);
    });
    request.pipe(proxyRequest);
}).listen(8080);

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/json' });
    res.write('request successfully proxied to port 9090!' + '\n' + JSON.stringify(req.headers, true, 2));
    res.end();
}).listen(9090);