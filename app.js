var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');

// Connection to DB
mongoose.connect('mongodb://localhost/usersOauth', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and controllers
var models = require('./models/usuario')(app, mongoose);
var usersController = require('./controllers/usuario');
// Example Route
var router = express.Router();
router.get('/', function(req, res) {
  res.send("Hello world!");
});
app.use(router);

// API routes
var user = express.Router();

user.route('/user')
  .get(usersController.findAllUser)
  .post(usersController.addUser);

user.route('/user/:id')
  .get(usersController.findById)
  .put(usersController.updateUser)
  .delete(usersController.desactivateUser);

user.route('/user/:id/activate')
  .put(usersController.activateUser);

user.route('/user/:id/changePassword')
  .put(usersController.changePassword);

app.use('/api', user);

// Start server
app.listen(5000, function() {
  console.log("Node server running on http://localhost:5000");
});
