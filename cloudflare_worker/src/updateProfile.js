import { formattedDate, formattedTime } from './utils';

export default async (c) => {
	const formData = await c.req.json();
	console.log('\n>>>>>>>>>>updateProfile\n', formData, '\n<<<<<<<<<<\n');
	const { id, user_id, name } = formData;

	// Satisfy rule: unique user_id
	const stmt = c.env.DB.prepare('SELECT * FROM profiles WHERE user_id = ?').bind(user_id);

	const { results } = await stmt.all();

	// Handle error
	if (results.length > 0 && results[0].id != id) {
		return c.json({
			status: 'error',
			msg: 'user_id is occupied',
		});
	}

	// Satisfy rule: cooled down (10 seconds)
	const stmt2 = c.env.DB.prepare('SELECT * FROM profiles WHERE id = ?').bind(id);

	const { results: results2 } = await stmt2.all();

	// Handle error
	if (!isCooledDown(results2[0].updated_at, 10)) {
		return c.json({
			status: 'error',
			msg: 'update too frequent',
		});
	}

	// Execute update
	const updated_at = formattedTime(new Date());
	const stmt3 = c.env.DB.prepare('UPDATE profiles SET user_id = ?, name = ?, updated_at = ? WHERE id = ?').bind(
		user_id,
		name,
		updated_at,
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

// Judge if update is too frequent
const isCooledDown = (updated_at, duration) => {
	return new Date(updated_at).getTime() + duration * 1000 < Date.now();
};
