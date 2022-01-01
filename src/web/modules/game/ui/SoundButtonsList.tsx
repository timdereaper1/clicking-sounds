import { shuffleList } from '../helpers/shuffling';
import { weirdSounds } from '../services/sounds';
import SoundButton from './SoundButton';

interface SoundButtonsListProps {
	gameState: string;
	onCheckSound(filePath: string): void;
}

export default function SoundButtonsList({ gameState, onCheckSound }: SoundButtonsListProps) {
	return (
		<>
			{shuffleList(weirdSounds).map((sound) => (
				<SoundButton
					disabled={gameState !== 'paused'}
					onClick={() => onCheckSound(sound)}
					key={sound}
				/>
			))}
		</>
	);
}
