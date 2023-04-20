import { useGame } from '../hooks/useGame';
import { GameContext } from './GameContext';
import { type ProviderProps, type UseGame } from '../interfaces';

const GameProvider = ({ children }: ProviderProps): JSX.Element => {
	const useGameData: UseGame = useGame();
	return (
		<GameContext.Provider value={{ ...useGameData }}>
			{children}
		</GameContext.Provider>
	);
};

export { GameProvider };
