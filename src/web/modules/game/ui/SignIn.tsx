import { ChangeEvent, FormEvent, useState } from 'react';

interface SignInProps {
	onSubmit(username: string): void;
}

export default function SignIn({ onSubmit }: SignInProps) {
	const [username, setUsername] = useState('');

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!username) return;
		onSubmit(username);
		setUsername('');
	}

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setUsername(e.target.value);
	}

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="username">
				Username
				<input
					type="text"
					required
					onChange={handleChange}
					value={username}
					name="username"
					id="username"
					placeholder="Enter your username"
				/>
			</label>
			<button disabled={!!!username} type="submit">
				Submit
			</button>
		</form>
	);
}
