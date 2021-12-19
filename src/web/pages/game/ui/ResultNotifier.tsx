interface ResultNotifierProps {
	gameState: string;
	resetGame(): void;
}

export default function ResultNotifier({ gameState, resetGame }: ResultNotifierProps) {
	if (gameState === 'won')
		return (
			<div>
				You won a very big prize
				<button onClick={resetGame}>Play again</button>
			</div>
		);

	if (gameState === 'lost')
		return (
			<div>
				You won nothing sorry, try again
				<button onClick={resetGame}>Try again</button>
			</div>
		);

	if (gameState === 'timeout')
		return (
			<div>
				Sorry, times up
				<button onClick={resetGame}>Try again</button>
			</div>
		);

	return null;
}
