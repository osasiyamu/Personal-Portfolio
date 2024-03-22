import './assets/css/main.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './assets/components';
import { Home, Jobs, Join, Login, MyPortfolio, PageNotFound, Search, UserProfileInfo } from './pages';

function App() {
	return (
		<div className='body'>
			<Navbar />
			<div className='main-info'>
				<BrowserRouter>
					<Routes path='/' element={<Home />}>
						<Route index element={<Home />} />
						{/*My search paths*/}
						<Route path='search' element={<Search />} />
						<Route path="userprofile" element={<UserProfileInfo />} />

						<Route path='jobs' element={<Jobs />} />

						{/* My Portfolio Paths */}
						<Route path='myportfolio' element={<MyPortfolio />} />
						<Route path='myportfolio/education' element={<MyPortfolio />} />
						<Route path='myportfolio/experience' element={<MyPortfolio />} />
						<Route path='myportfolio/licenses' element={<MyPortfolio />} />
						<Route path='myportfolio/projects' element={<MyPortfolio />} />
						<Route path='myportfolio/skills' element={<MyPortfolio />} />
						<Route path='myportfolio/contact' element={<MyPortfolio />} />

						<Route path='join' element={<Join />} />
						<Route path='login' element={<Login />} />
						<Route path='*' element={<PageNotFound />} />
					</Routes>
				</BrowserRouter>
			</div>
		</div>
	);
}

export default App;
