const express = require('express');
const http = require('http');

const hostname = 'localhost';
const port = 3000;

// means that the application uses the express module
const app = express();

// next is used when we want to include an additional middleware
app.use((req, res, next) => {
  console.log(req.headers);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>This is an Express Server</h1></body></html>')
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}`);
});