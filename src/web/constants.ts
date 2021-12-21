export const Constants = {
	Api: {
		SocketURL:
			process.env.NODE_ENV === 'development'
				? 'http://localhost:8000'
				: 'https://clicking-sounds-backend.herokuapp.com',
	},
};
