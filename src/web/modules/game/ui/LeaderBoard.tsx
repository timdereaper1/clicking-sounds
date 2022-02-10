import useLeaderBoard from '../hooks/useLeaderBoard';

export default function LeaderBoard() {
	const players = useLeaderBoard();
	return players ? (
		<ul>
			{Object.keys(players).map((userId) => (
				<li key={userId}>
					<strong>{players[userId].username}: </strong>
					<span data-testid="score">{players[userId].score}</span>
				</li>
			))}
		</ul>
	) : null;
}
