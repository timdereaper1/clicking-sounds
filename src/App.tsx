import { useState } from 'react';
import './App.css';
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

function App() {
	const [isClicked, setClicked] = useState(false);
	const [hasWon, setWon] = useState(false);
	const winningSound = weirdSounds[1];

	function playSound(sound: string) {
		if (isClicked) return;
		setWon(sound === winningSound);
		const audio = new Audio(sound);
		audio.play();
		setClicked(true);
	}

	function tryGameAgain() {
		setClicked(false);
		setWon(false);
	}

	return (
		<div className="App">
			{shuffleList(weirdSounds).map((sound) => (
				<SoundButton disabled={isClicked} onClick={() => playSound(sound)} key={sound} />
			))}
			{isClicked ? (
				hasWon ? (
					<div>
						You won a very big prize
						<button onClick={tryGameAgain}>Play again</button>
					</div>
				) : (
					<div>
						You won nothing sorry, try again
						<button onClick={tryGameAgain}>Try again</button>
					</div>
				)
			) : null}
		</div>
	);
}

export default App;
