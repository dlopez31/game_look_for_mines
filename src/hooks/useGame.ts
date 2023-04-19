import { useReducer, useEffect } from 'react';
import { gameReducer } from '../reducer/gameReducer';
import { ActionGame, CellEnum } from '../enums';
import { type UseGame, type GameState } from '../interfaces';
import {
	FACE_LOST,
	FACE_WON,
	MESSAGE_LOST,
	MESSAGE_WON,
	TITLE_LOST,
	TITLE_WON,
	initialize,
	initializeGrid,
} from '../const';
import {
	bombQuantity,
	bombPosition,
	booleanGridCreation,
	cellSelection,
	calculateScore,
	allOfUsAreDead,
	flagFeature,
	initialIterator,
	lastIterator,
	getOpenCells,
} from '../useful';

export const useGame = (): UseGame => {
	const [state, dispatch] = useReducer(gameReducer, initialize);

	const {
		booleanGrid,
		bombsOnGrid,
		currentMineRate,
		currentGridSize,
		lostStatus,
		grid,
		mines,
		score,
		face,
		isOpen,
		message,
		title,
	}: GameState = state;

	useEffect(() => {
		onFaceClick();
	}, []);

	useEffect(() => {
		if (score >= 100) {
			endGame(true);
		}
	}, [score]);

	const onFaceClick = (): void => {
		dispatch({
			type: ActionGame.SET_START_GAME,
			payload: {
				grid: initializeGrid(),
				face: 'default',
				emptyCells: 0,
				lostStatus: false,
				bombsOnGrid: bombQuantity(currentMineRate, initializeGrid()),
				booleanGrid: bombPosition(
					bombQuantity(currentMineRate, initializeGrid()),
					booleanGridCreation(currentGridSize)
				),
				mines: bombQuantity(currentMineRate, initializeGrid()),
				score: 0,
				isOpen: false,
			},
		});
	};

	const handleOnclick = (position: [number, number]): void => {
		if (!lostStatus) {
			grid[position[0]][position[1]] = cellSelection(
				...([position[0]] as const),
				...([position[1]] as const),
				booleanGrid
			);
			const result = grid[position[0]][position[1]];
			if (result === 11) {
				dispatch({
					type: ActionGame.SET_GAME_OVER,
					payload: {
						lostStatus: true,
						grid: allOfUsAreDead(
							...([position[0]] as const),
							...([position[1]] as const),
							grid,
							booleanGrid
						),
					},
				});
				endGame(false);
			} else {
				if (result === 0) {
					openAutomatic(position);
				}
				const openCell = getOpenCells(grid);
				const currentScore = calculateScore(booleanGrid, openCell, bombsOnGrid);

				dispatch({
					type: ActionGame.SET_SCORE,
					payload: {
						score: currentScore,
					},
				});
			}
		}
	};

	const openAutomatic = (position: [number, number]): void => {
		const rowInitiator = initialIterator(position[0]);
		const rowStopper = lastIterator(position[0], booleanGrid.length);
		const columnInitiator = initialIterator(position[1]);
		const columnStopper = lastIterator(position[1], booleanGrid.length);
		openCells(rowInitiator, rowStopper, columnInitiator, columnStopper);
	};

	const openCells = (
		rowInit: number,
		rowEnd: number,
		columnInit: number,
		columnEnd: number
	): void => {
		for (let i = rowInit; i <= rowEnd; i++) {
			for (let j = columnInit; j <= columnEnd; j++) {
				if (grid[i][j] < 0) {
					grid[i][j] = cellSelection(i, j, booleanGrid);
				}
			}
		}
	};

	const handleOnMouseDown = (): void => {
		lostStatus || dispatch({ type: ActionGame.SET_FACE, payload: 'doubtful' });
	};

	const handleOnMouseUp = (): void => {
		lostStatus || dispatch({ type: ActionGame.SET_FACE, payload: 'default' });
	};

	const handleOnContextMenu = (position: [number, number]): void => {
		if (!lostStatus) {
			const gridCopy = [...grid];
			if (grid[position[0]][position[1]] === -1) {
				gridCopy[position[0]][position[1]] = CellEnum.Flag;
			} else {
				gridCopy[position[0]][position[1]] = CellEnum.Hidden;
			}
			dispatch({
				type: ActionGame.SET_GRID,
				payload: gridCopy,
			});
			const flagWinner = !!flagFeature(bombsOnGrid, booleanGrid, grid);
			if (flagWinner) {
				endGame(true);
			}
		}
	};

	const endGame = (status: boolean): void => {
		dispatch({
			type: ActionGame.SET_END_GAME,
			payload: {
				face: status ? FACE_WON : FACE_LOST,
				title: status ? TITLE_WON : TITLE_LOST,
				score,
				message: status ? MESSAGE_WON : MESSAGE_LOST,
				isOpen: true,
			},
		});
	};

	return {
		onFaceClick,
		handleOnclick,
		handleOnMouseDown,
		handleOnMouseUp,
		handleOnContextMenu,
		mines,
		score,
		face,
		grid,
		isOpen,
		message,
		title,
	};
};
