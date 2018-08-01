const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const dishRouter = require('./routes/dishRouter');
const hostname = 'localhost';
const port = 3000;

// means that the application uses the express module
const app = express();
// using morgan
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/dishes', dishRouter);

// (__dirname + '/public') informs express.static, that I will look at the folder 'public'
// in the root folder of this project
// so this is the folder where static html files are served from by express server
app.use(express.static(__dirname + '/public'));

// next is used when we want to include an additional middleware
app.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>This is an Express Server</h1></body></html>')
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}`);
});
