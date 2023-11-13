import LandingPage from './pages/LandingPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import RegisterPage from 'pages/RegisterPage';
import KickOffPage from 'pages/KickOffPage';
import Dashboard from 'pages/Dashboard';
import GroupsPage from 'pages/GroupsPage';
import { BrowserRouter } from 'react-router-dom';
import { useAuthContext } from 'context/AuthContext';

function App() {
	const { user, authIsReady } = useAuthContext();

	if (!authIsReady) {
		return null; // Return null while waiting for authIsReady
	}
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					{user ? (
						<>
							{/* Authenticated routes */}
							<Route path="/kickoff" element={<KickOffPage />} />
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="/groups" element={<GroupsPage />} />
							{/* <Route path="*" element={<Navigate to="/dashboard" />} /> */}
							{/* Route guards */}
							{user.isKickOff ? (
								<Route path="*" element={<Navigate to="/dashboard" />} />
							) : (
								<Route path="*" element={<Navigate to="/kickoff" />} />
							)}
						</>
					) : (
						<>
							{/* Authentication routes */}
							<Route path="/" element={<LandingPage />} />
							<Route path="/register" element={<RegisterPage />} />
							{/* Route guards */}
							<Route path="*" element={<Navigate to="/register" />} />
						</>
					)}
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
