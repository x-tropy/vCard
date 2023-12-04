import { Hono } from 'hono';
import { prettyJSON } from 'hono/pretty-json';
import { cors } from 'hono/cors';

const api = new Hono().basePath('/api');
api.use('/*', prettyJSON({ space: 2 }));
api.use('/*', cors());

export default api;

// List of all available endpoints
api.get('/', (c) => {
	return c.json({
		'💡 Tips': 'use the ?pretty query param to get a pretty json response',
		'/api': 'show a list of all available endpoints',
		'/api/profile/:user_id': 'get a user profile',
		'/api/avatar/:user_id': 'get a user avatar',
		'/api/avatars/:user_id': 'get recent avatars of a user',
		'/api/countries': 'get a list of all countries',
		'/api/check/user/:user_id': 'check if a user id already exists',
	});
});

// Get one user profile
api.get('/profile/:user_id', async (c) => {
	const user_id = c.req.param('user_id');

	const stmt = c.env.DB.prepare('SELECT * FROM profiles WHERE user_id = ?').bind(user_id);

	const { results } = await stmt.all();

	console.log('\n>>>>>>>>>>', results, '<<<<<<<<<<\n');

	// Handle exceptions first
	if (results.length === 0) {
		return c.json({
			status: 'error',
			msg: 'user not found',
		});
	}

	if (results.length > 1) {
		return c.json({
			status: 'error',
			msg: 'multiple users found',
		});
	}

	// Success
	const profile = results[0];
	return c.json({
		status: 'success',
		msg: 'user found',
		result: profile,
	});
});
