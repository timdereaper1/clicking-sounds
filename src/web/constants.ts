export const Constants = {
	Api: {
		SocketURL:
			process.env.NODE_ENV === 'development'
				? 'ws://localhost:8000'
				: 'wss://clicking-sounds-backend.herokuapp.com',
	},
};
