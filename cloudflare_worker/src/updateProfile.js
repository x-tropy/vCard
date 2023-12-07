import { formattedDate, formattedTime } from './utils';
import addNft from './addNft';

export default async function (c) {
	const formData = await c.req.json();
	console.log('\n>>>>>>>>\n', 'DB:POST:Profile:Data', '\n', formData, '\n<<<<<<<<\n');
	let {
		id,
		name,
		user_id,
		bio,
		birth_date,
		location_country,
		working_status,
		linkedin_user_id,
		github_user_id,
		twitter_user_id,
		instagram_user_id,
		// phone,
		// country_calling_code,
		// phone_is_public,
		// email,
		// email_is_public,
	} = formData;

	// Satisfy rule: unique user_id
	const stmt = c.env.DB.prepare('SELECT * FROM profiles WHERE user_id = ?').bind(user_id);

	const { results } = await stmt.all();

	// Handle error
	if (results.length > 0 && results[0].id != id) {
		return c.json({
			status: 'error',
			message: 'user_id is occupied',
		});
	}

	// Satisfy rule: cooled down (10 seconds)
	const stmt2 = c.env.DB.prepare('SELECT * FROM profiles WHERE id = ?').bind(id);

	const { results: results2 } = await stmt2.all();

	// Handle error
	if (!isCooledDown(results2[0].updated_at, 10)) {
		return c.json({
			status: 'error',
			message: 'update too frequent',
		});
	}

	// Execute update
	const updated_at = formattedTime(new Date());

	// Compose SQL statement
	const stmt3 = c.env.DB.prepare(
		`UPDATE profiles SET user_id = ?, name = ?, updated_at = ?, bio = ?, birth_date = ?, location_country = ?, working_status = ?, linkedin_user_id = ?, github_user_id = ?, twitter_user_id = ?, instagram_user_id = ? WHERE id = ?`,
	).bind(
		user_id,
		name,
		updated_at,
		bio,
		birth_date,
		location_country,
		working_status,
		linkedin_user_id,
		github_user_id,
		twitter_user_id,
		instagram_user_id,
		// phone,
		// country_calling_code,
		// phone_is_public,
		// email,
		// email_is_public,
		id,
	);
	console.log('\n>>>>>>>>\n', 'DB:SQL', '\n', stmt3, '\n<<<<<<<<\n');
	const { success } = await stmt3.run();

	// Database error
	if (!success) {
		return c.json({
			status: 'error',
			message: 'System failed to update, please try again.',
		});
	}

	// Success
	// TODO: Add a NFT record

	return c.json({
		status: 'success',
		message: 'The profile is updated as you wish.',
	});
}

// Judge if update is too frequent
function isCooledDown(updated_at, duration) {
	return new Date(updated_at).getTime() + duration * 1000 < Date.now();
}
