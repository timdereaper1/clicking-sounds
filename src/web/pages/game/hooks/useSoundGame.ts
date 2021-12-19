import { useEffect, useState } from 'react';
import { SOCKET_EVENTS } from '../../../../common/events';
import { clientSocket } from '../../../services/socket';
import { winningSound } from '../services/sounds';

export default function useSoundGame() {
	const [elapsedTime, setElapsedTime] = useState(0);
	const [gameState, setGameState] = useState('paused');
	const [score, setScore] = useState(0);
	const [username, setUsername] = useState('');

	useEffect(() => {
		let timeout: NodeJS.Timeout;
		function incrementElapseTime() {
			timeout = setTimeout(() => {
				setElapsedTime((elapsedTime) => elapsedTime + 1);
				incrementElapseTime();
			}, 1000);
			if (gameState !== 'paused') clearTimeout(timeout);
		}
		incrementElapseTime();
		return () => clearTimeout(timeout);
	}, [gameState]);

	useEffect(() => {
		if (elapsedTime >= 30) setGameState('timeout');
	}, [elapsedTime]);

	function checkIsWinningSound(sound: string) {
		if (gameState !== 'paused') return;
		playSoundAudio(sound);
		updateGameState(sound);
	}

	function updateGameState(sound: string) {
		const hasWonGame = sound === winningSound;
		setGameState(hasWonGame ? 'won' : 'lost');
		if (hasWonGame) incrementPlayerTotalScore();
		setElapsedTime(0);
	}

	function incrementPlayerTotalScore() {
		if (!username) return;
		const newScore = score + 1;
		setScore(newScore);
		clientSocket.emit(SOCKET_EVENTS.PLAYER_SCORED, { username, score: newScore });
	}

	function playSoundAudio(sound: string) {
		const audio = new Audio(sound);
		audio.play();
	}

	function resetGame() {
		setGameState('paused');
		setElapsedTime(0);
	}

	function setPlayer(username: string) {
		setUsername(username);
		clientSocket.emit(SOCKET_EVENTS.REGISTER_NEW_PLAYER, { username, score });
	}

	return {
		setPlayer,
		resetGame,
		checkIsWinningSound,
		gameState,
		score,
		elapsedTime,
	};
}
