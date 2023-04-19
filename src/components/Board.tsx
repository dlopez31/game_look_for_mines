import { type CSSProperties } from 'react';
import { useGame } from '../hooks/useGame';
import { Cell } from './Cell';
import { AlertModal } from './modal';
import { type UseGame } from '../interfaces';
import '../styles.css';

export const Board = (): JSX.Element => {
	const {
		handleOnContextMenu,
		handleOnMouseDown,
		handleOnMouseUp,
		handleOnclick,
		onFaceClick,
		grid,
		mines,
		face,
		score,
		isOpen,
		message,
		title,
	}: UseGame = useGame();

	return (
		<div className='App' onMouseUp={handleOnMouseUp}>
			<section className='game-board'>
				<div className='controller'>
					<div className='mines-counter'>Mines: {mines}</div>
					<div
						onClick={onFaceClick}
						className={`status-button status-button--${face}-game`}
					></div>
					<div className='score'>Score: {score}</div>
				</div>
				{
					<div
						className='grid'
						style={{ '--grid-cells-side': grid.length } as CSSProperties}
					>
						{grid.length > 0 &&
							grid.flatMap((row, i) =>
								row.map((cell, j) => (
									<Cell
										key={`cell-${i}-${j}`}
										cell={cell}
										position={[i, j]}
										handleClickLeft={handleOnclick}
										handleClickRight={handleOnContextMenu}
										handleOnMouseDown={handleOnMouseDown}
									/>
								))
							)}
					</div>
				}
			</section>
			{isOpen && (
				<AlertModal
					title={title}
					message={message}
					onDismiss={onFaceClick}
				></AlertModal>
			)}
		</div>
	);
};
