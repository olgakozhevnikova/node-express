const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

// means that the application uses the express module
const app = express();
// using morgan
app.use(morgan('dev'));
app.use(bodyParser.json());

app.all('/dishes', (req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-type', 'text/plain');
  // the next() looks for additional specifications which will matches 'dishes' endpoint
  next();
});

// before get request happens, app.all will be executed first and req and res will be passed to the second parameter
app.get('/dishes', (req, res) => {
  res.end('Will send all the dishes to you');
});

app.post('/dishes', (req, res) => {
  res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

app.put('/dishes', (req, res) => {
  res.statusCode = 403;
  res.end('PUT operation is not supported on /dishes');
});

app.delete('/dishes', (req, res) => {
  res.end('Deleting all the dishes!');
});

// Actions for /:dishId endpoint
app.get('/dishes/:dishId', (req, res) => {
  res.end('Will send details of the dish: ' + req.params.dishId + ' to you!');
});

app.post('/dishes/:dishId', (req, res) => {
  res.statusCode = 403;
  res.end('POST operation is not supported on /dishes/' + req.params.dishId);
});

app.put('/dishes/:dishId', (req, res) => {
  res.write('Updating the dish: ' + req.params.dishId);
  res.end('Will update the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

app.delete('/dishes/:dishId', (req, res) => {
  res.end('Deleting dish: ' + req.params.dishId);
});

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