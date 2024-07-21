import { type ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async (event) => {
	event.cookies.delete('access_token', {
		path: '/',
		sameSite: 'strict',
		httpOnly: false
	});
	return {
		success: true
	};
};
