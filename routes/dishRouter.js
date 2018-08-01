const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-type', 'text/plain');
  // the next() looks for additional specifications which will matches 'dishes' endpoint
  next();
})
// before get request happens, app.all will be executed first and req and res will be passed to the second parameter
.get((req, res) => {
  res.end('Will send all the dishes to you');
})
.post((req, res) => {
  res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res) => {
  res.statusCode = 403;
  res.end('PUT operation is not supported on /dishes');
})
.delete((req, res) => {
  res.end('Deleting all the dishes!');
});

module.exports = dishRouter;
