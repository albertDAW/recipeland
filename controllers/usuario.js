var mongoose = require('mongoose');
var users  = mongoose.model('users');
var passwordHash = require('password-hash');

//GET - Return all users in the DB
exports.findAllUser = function(req, res) {
    users.find(function(err, user) {
    
    if(err){ 
        res.send(500, err.user);
    }

	else{
        res.status(200).json(user);
    }
	});
};

//GET - Return a user with specified ID
exports.findById = function(req, res) {
    users.findById(req.params.id, function(err, user) {
    if(err) return res.send(500, err.message);

    console.log('GET /user/' + req.params.id);
		res.status(200).json(user);
	});
};

//POST - Insert a new user in the DB
exports.addUser = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var user = new users({
        username: req.body.username,
        name: 	  req.body.name,
        surname:  req.body.surname,
        password: passwordHash.generate(req.body.password),
        email:    req.body.email,
		activated: true,
		roles: {
        	id:2,
			name:user
        }
	});
    console.log(user);

   user.save(function(err, user) {
		if(err) return res.send(500, err.message);
    res.status(200).json(user);
	});
};

//PUT - Update a register already exists
exports.updateUser = function(req, res) {
	users.findById(req.params.id, function(err, user) {
        console.log(req.body.username)
        if (req.body.username != undefined && req.body.username != null && req.body.username != '') {
            user.username = req.body.username;
        }else{
            user.username = user.username;
        }
        if (req.body.name != undefined && req.body.name != null && req.body.name != '') {
            user.name = req.body.name;
        }else{
            user.name = user.name;
        }
        if (req.body.surname != undefined && req.body.surname != null && req.body.surname != '') {
            user.surname = req.body.surname;
        }else{
            user.surname = user.surname;
        }
        if (req.body.email != undefined && req.body.email != null && req.body.email != '') {
            user.email = req.body.email;
        }else{
            user.email = user.email
        }
        user.password  = user.password;
        user.activated   = user.activated;
        user.roles = user.roles;

        user.save(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200).json(user);
		});
	});
};

//DELETE - Delete a User with specified ID
exports.desactivateUser = function(req, res) {
	users.findById(req.params.id, function(err, user) {
    	user.username   = user.username;
        user.name    = user.name;
        user.surname = user.surname;
        user.password  = user.password;
        user.email = user.email;
        user.activated   = false;
        user.roles = user.roles;

        user.save(function(err) {
            if(err) return res.send(500, err.message);
      res.status(200).json(user);
        });
	});
};

exports.activateUser = function(req, res) {
    users.findById(req.params.id, function(err, user) {
        user.username   = user.username;
        user.name    = user.name;
        user.surname = user.surname;
        user.password  = user.password;
        user.email = user.email;
        user.activated   = true;
        user.roles = user.roles;

        user.save(function(err) {
            if(err) return res.send(500, err.message);
      res.status(200).json(user);
        });
    });
};

exports.changePassword = function(req, res) {
    users.findById(req.params.id, function(err, user) {
        user.username   = user.username;
        user.name    = user.name;
        user.surname = user.surname;
        user.password  = passwordHash.generate(req.body.password);
        user.email = user.email;
        user.activated = user.activated;
        user.roles = user.roles;

        user.save(function(err) {
            if(err) return res.send(500, err.message);
      res.status(200).json(user);
        });
    });
};