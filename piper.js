const http = require('http');
const https = require('https');

function onRequest(request, response) {
    const options = {
        hostname: process.env.HOST_URL,
        port: process.env.HOST_PORT,
        path: request.url,
        headers: request.headers,
        method: request.method,
    };

    const proxy = (process.env.PROTOCOL === 'http')
        ? http.request(options, function (res) {
        response.writeHead(res.statusCode, res.headers);
        res.pipe(response, {
            end: true
        });

        console.log(request.method,  request.url, res.statusCode);
    }) :
        https.request(options, function (res) {
            response.writeHead(res.statusCode, res.headers);
            res.pipe(response, {
                end: true
            });

            console.log(request.method,  request.url, res.statusCode);
        })

    request.pipe(proxy, {
        end: true
    });
}

http.createServer(onRequest).listen(9090);