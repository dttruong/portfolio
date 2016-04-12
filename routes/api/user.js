var crypto = require('crypto');
var cookieRepo = require('../../repositories/cookie-repository');

module.exports = function(app) {
	app.get('/api/user', function *() {
		//TO-DO: Secure this route		
		
		var usersResult = yield this.knex.raw('select * from users');
		this.body = usersResult.rows;
	});
	
	/*
		- Since user is signing up, a new session key should be generated
		- We don't want to trust the key from the client
	*/
	app.post('/api/user', function *() {
		var body = this.request.body;
		var knex = this.knex;
		var sid = yield cookieRepo.setNewCookie(this);
		
		console.log('HEY3');
		//TO-DO: Ensure unique email
		
		var salt = '';
		var encryptedPass = '';
		crypto.randomBytes(64, function(err, buf) {
			if (err) throw err;
			
			salt = buf.toString('hex');
			
			crypto.pbkdf2(body.password, salt, 10000, 128, 'sha512', function(err, key) {
				if (err) throw err;
					
				encryptedPass = key.toString('hex');
			});
		});
		
		yield this.knex.transaction(function (trx) {
			trx.insert({session_key: sid}, 'id').into('sessions').then(function(ids) {
				console.log();
				trx.insert({
					first_name: body.firstName,
					last_name: body.lastName,
					session_key: sid,
					pass_hash: encryptedPass,
					pass_salt: salt,
					email: body.email,
					created_at: knex.raw('now()'),
					updated_at: knex.raw('now()')
				}).into('users').then(function() {
					trx.commit();
				}).catch(function(error) {
					trx.rollback();
					throw error;
				});
			}).then(function() {
				this.status = 200;
			}).catch(function(error) {
				throw error;
				this.status = 400;
			});
		});

		// yield this.knex.transaction(function (trx) {
		// 	console.log('hey');

		// 	trx.insert({session_key: sid}).into('sessions').then(function() {
		// 		console.log('WTH');
		// 		trx.insert({
		// 			first_name: body.firstName,
		// 			last_name: body.lastName,
		// 			pass_hash: encryptedPass,
		// 			pass_salt: salt,
		// 			email: body.email,
		// 			created_at: knex.raw('now()'),
		// 			updated_at: knex.raw('now()')
		// 		}).into('users').then(function() {
		// 			console.log('committing');
		// 			trx.commit();
		// 		}).catch(function(error) {
		// 			trx.rollback();
		// 			console.log(error);
		// 			throw error;
		// 		});
		// 	}).then(function() {
		// 		console.log('200');
		// 		this.status = 200;
		// 	}).catch(function(error) {
		// 		console.log(error);
		// 		this.status = 400;
		// 	});
		// });
	});
}