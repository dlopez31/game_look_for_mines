import { type CSSProperties } from 'react';
import { useGameContext } from '../context/GameContext';
import { Cell } from './Cell';
import { type UseGame } from '../interfaces';
import { AlertModal } from './modal';
import '../styles.css';

export const Board = (): JSX.Element => {
	const {
		handleOnMouseUp,
		onFaceClick,
		grid,
		mines,
		face,
		score,
		isOpen,
	}: UseGame = useGameContext();

	return (
		<div className='App' onMouseUp={handleOnMouseUp}>
			<section className='game-board'>
				<div className='controller'>
					<div className='mines-counter'>Mines: {mines}</div>
					<div
						onClick={onFaceClick}
						className={`status-button status-button--${face}-game`}></div>
					<div className='score'>Score: {score}</div>
				</div>
				{
					<div
						className='grid'
						style={{ '--grid-cells-side': grid.length } as CSSProperties}>
						{grid.length > 0 &&
							grid.flatMap((row, i) =>
								row.map((cell, j) => (
									<Cell key={`cell-${i}-${j}`} cell={cell} position={[i, j]} />
								))
							)}
					</div>
				}
			</section>
			{isOpen && <AlertModal />}
		</div>
	);
};
