import { formattedDate, formattedTime } from './utils';
import addNft from './addNft';

export default async (c) => {
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
		phone,
		country_calling_code,
		phone_is_public,
		email,
		email_is_public,
		linkedin_user_id,
		github_user_id,
		twitter_user_id,
		instagram_user_id,
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
	// Normalize empty string or undefined into null
	const updated_at = formattedTime(new Date());
	if (!bio) bio = null;
	if (!birth_date) birth_date = null;
	if (!location_country) location_country = null;
	if (!working_status) working_status = null;
	if (!phone) phone = null;
	if (!country_calling_code) country_calling_code = null;
	if (!phone_is_public) phone_is_public = null;
	if (!email) email = null;
	if (!email_is_public) email_is_public = null;
	if (!linkedin_user_id) linkedin_user_id = null;
	if (!github_user_id) github_user_id = null;
	if (!twitter_user_id) twitter_user_id = null;
	if (!instagram_user_id) instagram_user_id = null;

	// Compose SQL statement
	const stmt3 = c.env.DB.prepare(
		`UPDATE profiles SET user_id = ?, name = ?, updated_at = ?, bio = ?, birth_date = ?, location_country = ?, working_status = ?, phone = ?, country_calling_code = ?, phone_is_public = ?, email = ?, email_is_public = ?, linkedin_user_id = ?, github_user_id = ?, twitter_user_id = ?, instagram_user_id = ? WHERE id = ?`,
	).bind(
		user_id,
		name,
		updated_at,
		bio,
		birth_date,
		location_country,
		working_status,
		phone,
		country_calling_code,
		phone_is_public,
		email,
		email_is_public,
		linkedin_user_id,
		github_user_id,
		twitter_user_id,
		instagram_user_id,
		id,
	);
	console.log('\n>>>>>>>>\n', 'DB:SQL', '\n', stmt3, '\n<<<<<<<<\n');
	const { success } = await stmt3.run();

	// Database error
	if (!success) {
		return c.json({
			status: 'error',
			message: 'update failed',
		});
	}

	// Success
	// Add a NFT record

	return c.json({
		status: 'success',
		message: 'update success',
	});
};

// Judge if update is too frequent
const isCooledDown = (updated_at, duration) => {
	return new Date(updated_at).getTime() + duration * 1000 < Date.now();
};
