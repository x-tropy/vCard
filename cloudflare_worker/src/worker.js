import { Hono } from 'hono';
import { prettyJSON } from 'hono/pretty-json';
import { cors } from 'hono/cors';

// Split concerns
import getProfile from './getProfile.js';
import updateProfile from './updateProfile.js';
import getAvatar from './getAvatar.js';
import updateAvatar from './updateAvatar.js';

const api = new Hono().basePath('/api');
api.use('/*', prettyJSON({ space: 2 }));
api.use('/*', cors());

export default api;

// List all endpoints
api.get('/', (c) => {
	return c.json({
		'💡 Tips': 'use the ?pretty query param to get a pretty json response',
		'/api': 'show a list of all available endpoints',
		'/api/profile/:user_id': 'get a user profile',
		'/api/avatar/:user_id': 'get a user avatar',
		'/api/avatars/:user_id': 'get recent avatars of a user',
		'/api/countries': 'get a list of all countries',
		'/api/check/user/:user_id': 'check if a user id already exists',
		'/api/demouser': 'get the user_id of the demo user',
	});
});

// Get a profile
api.get('/profile/:user_id', getProfile);

// Update a profile
api.post('/profile', updateProfile);

// Get the demo user's user_id
api.get('/demouser', async (c) => {
	const stmt = c.env.DB.prepare('SELECT user_id FROM profiles WHERE id = ?').bind(1);
	const { results } = await stmt.all(1);
	return c.json(results[0]);
});

// Add or update a avatar
api.post('/avatar', updateAvatar);

// Get a avatar
api.get('/avatar/:user_id', getAvatar);
