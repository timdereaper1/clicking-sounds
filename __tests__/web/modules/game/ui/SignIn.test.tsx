import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignIn from '../../../../../src/web/modules/game/ui/SignIn';

const onSubmit = jest.fn();

beforeEach(() => {
	render(<SignIn onSubmit={onSubmit} />);
});

afterEach(() => {
	onSubmit.mockReset();
});

test('should show a form with valid inputs', () => {
	expect(screen.getByRole('textbox', { name: /Username/i })).toBeInTheDocument();
	expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
});

test("should show the user's entered username", () => {
	userEvent.type(screen.getByRole('textbox', { name: /Username/i }), 'TestingUser123');
	expect(screen.getByLabelText(/Username/)).toHaveValue('TestingUser123');
});

test('should call the onSubmit function with the username when enter key is pressed', () => {
	userEvent.type(screen.getByRole('textbox', { name: /Username/i }), 'TestingUser123{enter}');
	expect(onSubmit).toHaveBeenCalledWith('TestingUser123');
	expect(screen.getByRole('textbox', { name: /Username/i })).toHaveValue('');
});

test('should call onSubmit when Submit button is clicked', () => {
	userEvent.type(screen.getByRole('textbox', { name: /Username/i }), 'TestingUser123');
	userEvent.click(screen.getByRole('button', { name: /Submit/i }));
	expect(onSubmit).toHaveBeenCalledWith('TestingUser123');
	expect(screen.getByRole('textbox', { name: /Username/i })).toHaveValue('');
});

test('should call onSubmit when Submit button is clicked', () => {
	userEvent.type(screen.getByRole('textbox', { name: /Username/i }), 'TestingUser123');
	userEvent.click(screen.getByRole('button', { name: /Submit/i }));
	expect(onSubmit).toHaveBeenCalledWith('TestingUser123');
	expect(screen.getByRole('textbox', { name: /Username/i })).toHaveValue('');
});

test('should not call onSubmit when there is no username', () => {
	userEvent.type(screen.getByRole('textbox', { name: /Username/i }), '{enter}');
	expect(onSubmit).not.toHaveBeenCalled();
	userEvent.click(screen.getByRole('button', { name: /Submit/i }));
	expect(onSubmit).not.toHaveBeenCalled();
});
