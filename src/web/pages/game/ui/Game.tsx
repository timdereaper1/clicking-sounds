import useSoundGame from '../hooks/useSoundGame';
import SoundButtonsList from './SoundButtonsList';
import LeaderBoard from './LeaderBoard';
import ResultNotifier from './ResultNotifier';
import SignIn from './SignIn';

export default function Game() {
	const { elapsedTime, setPlayer, checkIsWinningSound, gameState, score, resetGame } =
		useSoundGame();

	return (
		<div className="App">
			<SoundButtonsList onCheckSound={checkIsWinningSound} gameState={gameState} />
			<p>Time remaining {30 - elapsedTime}s</p>
			<p>Your total score {score}</p>
			<ResultNotifier gameState={gameState} resetGame={resetGame} />
			<LeaderBoard />
			<SignIn onSubmit={setPlayer} />
		</div>
	);
}
