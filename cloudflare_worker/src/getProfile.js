export default async (c) => {
	// Note: add prefix to query param
	const param_user_id = c.req.param('user_id');

	const stmt = c.env.DB.prepare('SELECT * FROM profiles WHERE user_id = ?').bind(param_user_id);

	const { results } = await stmt.all();

	console.log('\n>>>>>>>>>>getProfile\n', results, '\n<<<<<<<<<<\n');

	// Handle exception
	if (results.length === 0) {
		return c.json({
			status: 'error',
			message: 'user not found',
		});
	}

	// Handle exception
	if (results.length > 1) {
		return c.json({
			status: 'error',
			message: 'multiple users found',
		});
	}

	// Success
	const { id, user_id, name, created_at, updated_at, birth_date } = results[0];

	return c.json({
		status: 'success',
		message: 'user found',
		data: { id, user_id, name, created_at, updated_at, birth_date },
	});
};
