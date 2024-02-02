import './assets/css/main.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './assets/components';
import { Home, Jobs, Join, Login, MyPortfolio, PageNotFound, Search } from './pages';

function App() {
	return (
		<div className='body'>
			<Navbar />
			<BrowserRouter>
				<Routes path='/' element={<Home />}>
					<Route index element={<Home />} />
					<Route path='search' element={<Search />} />
					<Route path='jobs' element={<Jobs />} />
					<Route path='myportfolio' element={<MyPortfolio />} />
					<Route path='join' element={<Join />} />
					<Route path='login' element={<Login />} />
					<Route path='*' element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
