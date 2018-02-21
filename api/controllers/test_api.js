'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
var util = require('util');
var Points = require('../models/points');

/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

  In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
  we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */
module.exports = {
  list: getList,
  add: addPoint
};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function getList(req, res) {

    Points.find(function (err, data) {
        if(err) { return handleError(res, err); }
        return res.status(200).json(data);
    });
}


function addPoint(req, res) {

    var a = req.body.points[0][0] - req.body.points[1][0];
    var b = req.body.points[0][1] - req.body.points[1][1];
    var distance = Math.sqrt( a*a + b*b );

    var newPoint = {
        points: req.body.points,
        distance: distance
    };

    Points.create(newPoint, function(err, content) {
        if(err) { return handleError(res, err); }
        console.log(content);
        return res.status(201).json(content);
    });
}
