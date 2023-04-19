import React from 'react';
import { render } from '@testing-library/react';
import { Board } from '../../../src/components/Board';

describe('Board component', () => {
	test('renders correctly', () => {
		const { getByText, getAllByTestId } = render(<Board />);

		expect(getByText('Mines: 2')).toBeInTheDocument();
		expect(getByText('Score: 0')).toBeInTheDocument();
		expect(getAllByTestId('cell')).toHaveLength(2);
	});
});
