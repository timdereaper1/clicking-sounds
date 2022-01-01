export function shuffleList(sounds: string[]): string[] {
	if (sounds.length === 1) return sounds;
	const randomIndex = Math.floor(Math.random() * sounds.length);
	return [sounds[randomIndex], ...shuffleList(sounds.filter((_, i) => i !== randomIndex))];
}
