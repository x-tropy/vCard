export default async (c) => {
	const param_user_id = c.req.param('user_id');
	console.log('\n>>>>>>>>\n', 'DB:getAvatar', '\n', param_user_id, '\n<<<<<<<<\n');

	// 1. Get the user's profile id
	const stmt = c.env.DB.prepare('SELECT id FROM profiles WHERE user_id = ?').bind(param_user_id);
	const { results } = await stmt.all();

	// Handle error
	// user not found
	if (results.length === 0) {
		return c.json({
			status: 'error',
			message: 'user not found',
		});
	}

	// 2. Get the user's avatar
	const stmt2 = c.env.DB.prepare('SELECT * FROM avatars WHERE profile_id = ?').bind(results[0].id);

	const { results: results2 } = await stmt2.all();
	console.log('\n>>>>>>>>\n', 'result 2', '\n', results2, '\n<<<<<<<<\n');

	// Handle error
	// avatar not found
	if (results2.length === 0) {
		return c.json({
			status: 'error',
			message: 'avatar not found',
		});
	}

	// Success
	return c.json({
		status: 'success',
		message: 'avatar found',
		data: results2[0],
	});
};
