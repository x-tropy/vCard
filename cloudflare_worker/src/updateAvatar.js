export default async (c) => {
	const { user_id, avatar } = await c.req.json();

	// 1. Get the user's profile id
	const stmt = c.env.DB.prepare('SELECT id FROM profiles WHERE user_id = ?').bind(user_id);
	const { results } = await stmt.all();

	// If the user doesn't exist, return an error
	if (results.length === 0) {
		console.log('\n>>>>>>>>\n', 'Case 1', '\n', '\n<<<<<<<<\n');
		return c.json({
			status: 'error',
			message: 'user does not exist',
		});
	}

	const profile_id = results[0].id;

	// Insert a new avatar if the user doesn't have one
	const stmt1 = c.env.DB.prepare('SELECT id FROM avatars WHERE profile_id = ?').bind(profile_id);
	const { results: results1 } = await stmt1.all();
	if (results1.length === 0) {
		console.log('\n>>>>>>>>\n', 'Case 2', '\n', '\n<<<<<<<<\n');
		const stmt2 = c.env.DB.prepare('INSERT INTO avatars (profile_id, avatar) VALUES (?, ?)').bind(profile_id, avatar);
		try {
			await stmt2.run();
			// Success
			return c.json({
				status: 'success',
				message: 'avatar created',
			});
		} catch (e) {
			// Handle error
			return c.json({
				status: 'error',
				message: 'avatar creation failed',
			});
		}
	}

	// Update the avatar
	console.log('\n>>>>>>>>\n', 'Case 3', '\n', '\n<<<<<<<<\n');
	const stmt3 = c.env.DB.prepare('UPDATE avatars SET avatar = ? WHERE profile_id = ?').bind(avatar, profile_id);
	try {
		await stmt3.run();
		// Success
		return c.json({
			status: 'success',
			message: 'avatar updated',
		});
	} catch (e) {
		// Handle error
		return c.json({
			status: 'error',
			message: 'avatar update failed',
		});
	}
};
