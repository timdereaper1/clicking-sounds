import { render, screen } from '@testing-library/react';
import LeaderBoard from '../../../../../src/web/modules/game/ui/LeaderBoard';
import useLeaderBoard from '../../../../../src/web/modules/game/hooks/useLeaderBoard';

jest.mock('../../../../../src/web/modules/game/hooks/useLeaderBoard');

const mockUseLeaderBoard = useLeaderBoard as jest.MockedFunction<typeof useLeaderBoard>;

test('should render 10 players to the document', () => {
	render(<LeaderBoard />);
	expect(screen.getByRole('list')).toBeInTheDocument();
	expect(screen.getAllByRole('listitem')).toHaveLength(10);
});

test('should render 10 username and scores', () => {
	render(<LeaderBoard />);
	expect(screen.getAllByText(/Player/i)).toHaveLength(10);
	expect(screen.getAllByTestId(/score/i)).toHaveLength(10);
});

test.each([
	['Player One', 23],
	['Player Two', 45],
])('%p has a score of %d', (username, score) => {
	render(<LeaderBoard />);
	expect(screen.getByText(new RegExp(username, 'i'))).toBeInTheDocument();
	expect(
		screen.getAllByTestId((text, content) => {
			return text === 'score' && content?.textContent === score.toString();
		})
	).toHaveLength(1);
});

test('should not render any list when there are no players', () => {
	mockUseLeaderBoard.mockReturnValueOnce(undefined);
	render(<LeaderBoard />);
	expect(screen.queryByRole('list')).not.toBeInTheDocument();
});
