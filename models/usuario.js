exports = module.exports = function(app, mongoose) {

	var usuarioSchema = new mongoose.Schema({
		username: 	{ type:String, unique:true },
		name: 		{ type: String },
		surname: 	{ type: String },
		password: 	{ type: String },
		email:  	{ type: String },
		activated:  { type: Boolean},
		roles: 		{
			id: { type: Number},
			name: ['admin', 'usuario']
		}
	});

	mongoose.model('users', usuarioSchema);

};