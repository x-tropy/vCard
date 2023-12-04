import { Hono } from 'hono';
import { prettyJSON } from 'hono/pretty-json';
import { cors } from 'hono/cors';

const api = new Hono().basePath('/api');
api.use('/*', prettyJSON({ space: 2 }));
api.use('/*', cors());

export default api;

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
