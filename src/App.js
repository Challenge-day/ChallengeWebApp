import LandingPage from './pages/LandingPage';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from 'pages/RegisterPage';
import KickOffPage from 'pages/KickOffPage';
import Dashboard from 'pages/Dashboard';
import GroupsPage from 'pages/GroupsPage';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/kickoff" element={<KickOffPage />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/groups" element={<GroupsPage />} />
			</Routes>
		</div>
	);
}

export default App;
