import { useEffect, useState } from 'react';
import { SOCKET_EVENTS } from '../../../../events';
import { RegisteredOnlinePlayers } from '../../../../types';
import { clientSocket } from '../../../services/socket';

export default function useLeaderBoard() {
	const [players, setPlayers] = useState<RegisteredOnlinePlayers>();

	useEffect(() => {
		const handler = (newPlayers: RegisteredOnlinePlayers) => setPlayers(newPlayers);
		clientSocket.on(SOCKET_EVENTS.GET_ONLINE_PLAYERS, handler);
		return () => {
			clientSocket.off(SOCKET_EVENTS.GET_ONLINE_PLAYERS, handler);
		};
	}, []);

	return players;
}
