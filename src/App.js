import './assets/css/main.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './assets/scripts';
import { Home, MyPortfolio, PageNotFound } from './pages';

function App() {
	return (
		<div className='body'>
			<Navbar />
			<BrowserRouter>
				<Routes path='/' element={<Home />}>
					<Route index element={<Home />} />
					<Route path='myportfolio' element={<MyPortfolio />} />
					<Route path='*' element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
