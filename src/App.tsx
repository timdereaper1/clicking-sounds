import { useEffect, useState } from 'react';
import SoundButton from './SoundButton';

const weirdSounds: string[] = [
	'/sounds/mixkit-fire-spell-with-explosion-1338.wav',
	'/sounds/mixkit-conference-audience-clapping-strongly-476.wav',
	'/sounds/mixkit-aggressive-monster-beast-roar-14.wav',
	'/sounds/mixkit-falling-male-scream-391.wav',
	'/sounds/mixkit-little-devil-laughing-413.wav',
];

function shuffleList(sounds: string[]): string[] {
	if (sounds.length === 1) return sounds;
	const randomIndex = Math.floor(Math.random() * sounds.length);
	return [sounds[randomIndex], ...shuffleList(sounds.filter((_, i) => i !== randomIndex))];
}

const winningSound = weirdSounds[1];

function App() {
	const [elapsedTime, setElapsedTime] = useState(0);
	const [playingState, setPlayState] = useState('paused');
	const [totalScore, setTotalScore] = useState(0);

	useEffect(() => {
		let timeout: NodeJS.Timeout;
		function incrementElapseTime() {
			timeout = setTimeout(() => {
				setElapsedTime((elapsedTime) => elapsedTime + 1);
				incrementElapseTime();
			}, 1000);
			if (playingState !== 'paused') clearTimeout(timeout);
		}
		incrementElapseTime();
		return () => clearTimeout(timeout);
	}, [playingState]);

	useEffect(() => {
		if (elapsedTime >= 30) setPlayState('timeout');
	}, [elapsedTime]);

	function playSound(sound: string) {
		if (playingState !== 'paused') return;
		const audio = new Audio(sound);
		audio.play();
		const hasWonGame = sound === winningSound;
		setPlayState(hasWonGame ? 'won' : 'lost');
		if (hasWonGame) setTotalScore(totalScore + 1);
		setElapsedTime(0);
	}

	function tryGameAgain() {
		setPlayState('paused');
		setElapsedTime(0);
	}

	return (
		<div className="App">
			{shuffleList(weirdSounds).map((sound) => (
				<SoundButton
					disabled={playingState !== 'paused'}
					onClick={() => playSound(sound)}
					key={sound}
				/>
			))}
			<p>Time remaining {30 - elapsedTime}s</p>
			<p>Your total score {totalScore}</p>
			{playingState === 'won' && (
				<div>
					You won a very big prize
					<button onClick={tryGameAgain}>Play again</button>
				</div>
			)}
			{playingState === 'lost' && (
				<div>
					You won nothing sorry, try again
					<button onClick={tryGameAgain}>Try again</button>
				</div>
			)}
			{playingState === 'timeout' && (
				<div>
					Sorry, times up
					<button onClick={tryGameAgain}>Try again</button>
				</div>
			)}
		</div>
	);
}

export default App;
