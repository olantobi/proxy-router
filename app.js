const http = require('http');
const https = require('https');
const net = require('net');
const { URL } = require('url');

// Create an HTTP tunneling proxy
const proxy = http.createServer((req, res) => {
    const { headers, method, url } = req;

    console.log("Host: ", process.env.HOST_URL);
    console.log("PORT: ", process.env.HOST_PORT);

    let body = [];
    req.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();

        const options = {
            host: process.env.HOST_URL,
            port: process.env.HOST_PORT,
            path: url,
            method: method,
            headers: headers,
            body: body
        }

        http.request(options, (response) => {
            response.pipe(res, { end: true });
        })
    });
}).listen(9090);