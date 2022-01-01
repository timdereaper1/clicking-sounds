import useLeaderBoard from '../hooks/useLeaderBoard';

export default function LeaderBoard() {
	const players = useLeaderBoard();
	return players ? (
		<ul>
			{Object.keys(players).map((username) => (
				<li key={username}>
					<strong>{username}: </strong> {players[username].score}
				</li>
			))}
		</ul>
	) : null;
}
