import { CellEnum } from '../enums';
import { type ICell } from '../interfaces';

export const Cell = ({
	cell,
	position,
	handleClickLeft,
	handleOnMouseDown,
	handleClickRight,
}: ICell): JSX.Element => {
	const handleRightClick = (e: any, position: [number, number]): void => {
		e.preventDefault();
		handleClickRight(position);
	};

	const handleOnClick = (position: [number, number]): void => {
		handleClickLeft(position);
	};

	const renderCell = (): JSX.Element => {
		switch (cell) {
			case CellEnum.Hidden:
				return (
					<div
						className={'cell'}
						onMouseDown={handleOnMouseDown}
						onClick={(): void => {
							handleOnClick(position);
						}}
						onContextMenu={(e): void => {
							handleRightClick(e, position);
						}}
					></div>
				);
			case CellEnum.Flag:
				return (
					<div
						className={'cell cell__flag'}
						onMouseDown={handleOnMouseDown}
						onClick={(): void => {
							handleOnClick(position);
						}}
						onContextMenu={(e): void => {
							handleRightClick(e, position);
						}}
					></div>
				);
			case CellEnum.Mine:
				return <div className={'cell cell__mine cell__mine--shown'} />;
			case CellEnum.ClickedMine:
				return (
					<div
						className={'cell cell__mine cell__mine--shown cell__mine--clicked'}
					/>
				);
			default:
				return <div className={`cell cell--mines-${cell}`}>{cell}</div>;
		}
	};

	return renderCell();
};
