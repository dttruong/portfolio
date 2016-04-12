exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(), 

    // Inserts seed entries
    knex('users').insert({first_name: 'Bruce', last_name: 'Lee', email: 'blee@email.com', pass_hash: 'blee', pass_salt: 'salty', created_at: knex.raw('now()'), updated_at: knex.raw('now()')}),
    knex('users').insert({first_name: 'Jackie', last_name: 'Chan', email: 'jchan@email.com', pass_hash: 'jchan', pass_salt: 'salty', created_at: knex.raw('now()'), updated_at: knex.raw('now()')}),
    knex('users').insert({first_name: 'Donnie', last_name: 'Yen', email: 'dyen@email.com', pass_hash: 'dyen', pass_salt: 'salty', created_at: knex.raw('now()'), updated_at: knex.raw('now()')}),
    knex('users').insert({first_name: 'Sammo', last_name: 'Hung', email: 'shung@email.com', pass_hash: 'shung', pass_salt: 'salty', created_at: knex.raw('now()'), updated_at: knex.raw('now()')})
  );
};