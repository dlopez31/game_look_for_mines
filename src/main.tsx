import ReactDOM from 'react-dom/client';
import { Board } from './components/Board';
import { GameProvider } from './context/GameProvider';
const divRoot = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

divRoot.render(
	<GameProvider>
		<Board />
	</GameProvider>
);
