import ReactDOM from 'react-dom/client';
import { Board } from './components/Board';

const divRoot = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

divRoot.render(<Board />);
