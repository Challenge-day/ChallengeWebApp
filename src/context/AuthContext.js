import { createContext, useReducer, useEffect, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, database } from '../firebase/config';
import { child, get, ref } from 'firebase/database';

export const AuthContext = createContext();
export const authReducer = (state, action) => {
	switch (action.type) {
		// When the action type is "LOGIN", update the state with the new user information
		case 'LOGIN':
			return { ...state, user: action.payload };

		// When the action type is "LOGOUT", update the state to remove the user information
		case 'LOGOUT':
			return { ...state, user: null };

		// When the action type is "AUTH_IS_READY", update the state with user information and
		// set a state to indicate that the authentication process is complete
		case 'AUTH_IS_READY':
			return { user: action.payload, authIsReady: true };

		// For any other action type, return the current state without any changes
		default:
			return state;
	}
};

// Authentication context provider component
export const AuthContextProvider = ({ children }) => {
	// Initialize authentication state using a reducer
	const [state, dispatch] = useReducer(authReducer, {
		user: null,
		authIsReady: false,
	});

	// Effect to determine initial authentication state and update context
	useEffect(() => {
		// Subscribe to authentication state changes
		const unsub = onAuthStateChanged(auth, (user) => {
			get(child(ref(database), 'users/'))
				.then((snapshot) => {
					if (snapshot.exists()) {
						let data = snapshot.val();
						data.forEach((userData) => {
							if (userData.email === (user === null ? '' : user.email)) {
								// Dispatch an action to update the state with the user information
								dispatch({ type: 'AUTH_IS_READY', payload: userData });
							}
						});
					} else {
						dispatch({ type: 'AUTH_IS_READY', payload: user });
						console.log('Data not available');
					}
				})
				.catch((error) => {
					console.error(error);
				});

			// Unsubscribe to avoid further unnecessary updates
			unsub(); // Unsubscribe once the initial auth state is determined
		});
	}, []);

	// Provide authentication state and dispatch function to children components
	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};
// Custom hook to access the authentication context
export function useAuthContext() {
	// Get the authentication context from the nearest AuthContextProvider
	const context = useContext(AuthContext);

	// Check if the context was successfully obtained
	if (!context) {
		throw Error('useAuthContext must be used inside an AuthContextProvider');
	}

	// Return the authentication context object for use in components
	return context;
}
