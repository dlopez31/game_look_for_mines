import React from 'react';
import { render } from '@testing-library/react';
import { Cell } from '../../../src/components/Cell';
import { CellEnum } from '../../../src/enums';

describe('Cell', () => {
	it('renders correctly', () => {
		const { container } = render(
			<Cell
				cell={CellEnum.Hidden}
				position={[10, 10]}
				handleClickLeft={() => {}}
				handleOnMouseDown={() => {}}
				handleClickRight={() => {}}
			/>
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
