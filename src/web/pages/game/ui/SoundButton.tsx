interface SoundButtonProps {
	onClick: () => void;
	disabled: boolean;
}

export default function SoundButton({ onClick, disabled }: SoundButtonProps) {
	return (
		<button className="sound-button" disabled={disabled} onClick={onClick}>
			click here
		</button>
	);
}
