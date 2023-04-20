import { createContext, useContext } from 'react';
import { type UseGame } from '../interfaces';

export const GameContext = createContext<UseGame>({} as UseGame);

export const useGameContext = (): UseGame => {
	return useContext<UseGame>(GameContext);
};
