import http from 'http';
import { Server } from 'socket.io';
import { SOCKET_EVENTS } from '../events';
import { OnlinePlayer } from '../types';
import { onlinePlayers } from './onlinePlayers';

export default class SocketServer {
	private io: Server;

	constructor(server: http.Server) {
		this.io = new Server(server, {
			cors: {
				origin: '*',
			},
		});
	}

	start() {
		this.io.on('connection', (socket) => {
			socket.on(SOCKET_EVENTS.REGISTER_NEW_PLAYER, (user?: OnlinePlayer) => {
				if (!user) return;
				onlinePlayers[user.username] = user;
				socket.data.user = user;
				this.io.emit(SOCKET_EVENTS.GET_ONLINE_PLAYERS, onlinePlayers);
			});

			socket.on(SOCKET_EVENTS.PLAYER_SCORED, (user?: OnlinePlayer) => {
				if (!user) return;
				onlinePlayers[user.username] = user;
				this.io.emit(SOCKET_EVENTS.GET_ONLINE_PLAYERS, onlinePlayers);
			});

			socket.on('disconnect', () => {
				if (!socket.data.user?.username) return;
				delete onlinePlayers[socket.data.user.username];
				this.io.emit(SOCKET_EVENTS.GET_ONLINE_PLAYERS, onlinePlayers);
			});
		});
	}
}
