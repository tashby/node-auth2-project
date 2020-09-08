exports.seed = async function(knex) {
	await knex("users").insert([   
		{id: 1, username: 'janedoe', password: 'pass1234', department: 'admin'}
	])
}