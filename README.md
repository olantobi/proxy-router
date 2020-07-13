# proxy-router

This is simple forward proxy utility written in nodejs. 

If you have an API that restricts IP addresses, this app can stand as forward proxy to forward all requests.

It supports both http and https requests.

Usage:
HOST_URL=xxx.xxx.xxx.xxx HOST_PORT=9000 PROTOCOL=[http/https] node app.js
