import { working_status } from './utils';

export default async (c) => {
	// Note: add prefix to query param
	const param_user_id = c.req.param('user_id');

	const stmt = c.env.DB.prepare('SELECT * FROM profiles WHERE user_id = ?').bind(param_user_id);

	const { results } = await stmt.all();

	console.log('\n>>>>>>>>\n', 'DB:Get:Profile', '\n', results, '\n<<<<<<<<\n');
	// Handle error
	if (results.length === 0) {
		return c.json({
			status: 'error',
			message: 'user not found',
		});
	}

	// Handle error
	if (results.length > 1) {
		return c.json({
			status: 'error',
			message: 'multiple users found',
		});
	}

	// Success
	// Send working_status enum and countries list as meta data
	const countries = await c.env.DB.prepare('SELECT * FROM countries').all();
	return c.json({
		status: 'success',
		message: 'user found',
		data: {
			...results[0],
			meta: {
				working_status,
				countries: countries.results,
			},
		},
	});
};
