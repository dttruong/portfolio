exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.createTable('sessions', function(table) {
			table.bigIncrements();
			table.string('session_key', 128).notNullable().index();
			table.timestamps();
		}),
		knex.schema.createTable('users', function(table) {
			table.increments();
			table.string('session_key', 128).index();
			table.string('first_name', 50).notNullable();
			table.string('last_name', 50).notNullable();
			table.string('email', 100).notNullable().unique();
			table.string('pass_hash', 256).notNullable();
			table.string('pass_salt', 128).notNullable();
			table.timestamps();
		})
	]);
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTable('users', function(table) {
			table.dropIndex('session_key');
		}),
		knex.schema.dropTable('sessions', function(table) {
			table.dropIndex('session_key');
		})
	]);
};