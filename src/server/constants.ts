export const Constants = {
	Env: {
		Port: process.env.PORT ?? 8000,
	},
	App: {
		URL:
			process.env.NODE_ENV === 'production'
				? 'https://clicking-sounds.netlify.com'
				: 'http://localhost:3000',
	},
};
