export default async (c) => {
	let { id, user_id, name } = await c.req.json();

	// Satisfy rule: unique
	const stmt = c.env.DB.prepare('SELECT * FROM profiles WHERE user_id = ?').bind(user_id);

	const { results } = await stmt.all();

	// Handle exception
	if (results.length > 0 && results[0].id !== id) {
		return c.json({
			status: 'error',
			msg: 'user_id is occupied',
		});
	}

	// Satisfy rule: cooled down (10 seconds)
	const stmt2 = c.env.DB.prepare('SELECT * FROM profiles WHERE id = ?').bind(id);

	const { results: results2 } = await stmt2.all();

	// Handle exception
	if (new Date(results2[0].updated_at).getTime() + 10 * 1000 > Date.now()) {
		return c.json({
			status: 'error',
			msg: 'update too frequent',
		});
	}

	// Execute update
	const stmt3 = c.env.DB.prepare('UPDATE profiles SET user_id = ?, name = ?, updated_at = ? WHERE id = ?').bind(
		user_id,
		name,
		Date.now(),
		id,
	);
	const { success } = await stmt3.run();

	// Database error
	if (!success) {
		return c.json({
			status: 'error',
			msg: 'update failed',
		});
	}

	// Success
	return c.json({
		status: 'success',
		msg: 'update success',
	});
};
