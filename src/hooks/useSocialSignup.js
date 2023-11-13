import { useEffect, useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, database } from '../firebase/config';
import { useAuthContext } from '../context/AuthContext';
import { onValue, ref, set } from 'firebase/database';

export const useSocialSignup = (provider) => {
	// State variables to manage sign-up process
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [isCancelled, setIsCancelled] = useState(false);

	// Accessing the authentication context's dispatch function
	const { dispatch } = useAuthContext();

	// Function to initiate the social sign-up process
	const signInWithSocial = async (userData) => {
		setError(null);
		setIsPending(true);

		try {
			const res = await signInWithPopup(auth, provider);
			userData.email = res.user.email;
			userData.creationTime = res.user.metadata.creationTime;
			userData.createdAt = res.user.metadata.createdAt;
			userData.accessToken = res.user.accessToken;
			userData.lastLoginAt = res.user.metadata.lastLoginAt;
			userData.lastSignInTime = res.user.metadata.lastSignInTime;

			const groupNames = ['A', 'B', 'C', 'D'];
			const groupLinks = [
				'https://t.me/+_pzOk7YVH1QxNTAy',
				'https://t.me/+8Lm0CGFVNC1lMGRi',
				'https://t.me/+unQfh9GV9Ek5MmVi',
				'https://t.me/+a23D3a32oK8wMWEy',
			];
			const groupIndex = Math.floor(Math.random() * groupNames.length);

			userData.groupName = groupNames[groupIndex];
			userData.groupLink = groupLinks[groupIndex];
			userData.isKickOff = false;
			const usersRef = ref(database, 'users/');
			await onValue(
				usersRef,
				(snapshot) => {
					const data = snapshot.val();
					if (!!data) {
						userData.userIndex = data.length;
						set(ref(database, 'users/' + data.length), userData)
							.then(() => {})
							.catch((error) => {
								console.log(error);
							});
					} else {
						userData.userIndex = 0;
						set(ref(database, 'users/' + 0), userData)
							.then(() => {})
							.catch((error) => {
								console.log(error);
							});
						console.log('Data not found');
					}
				},
				{
					onlyOnce: true,
				},
			);
			dispatch({ type: 'LOGIN', payload: userData });

			if (!isCancelled) {
				setIsPending(false);
				setError(null);
			}
		} catch (err) {
			setError(err.message);
			setIsPending(false);
		}
	};

	// Effect hook to set isCancelled to true when component unmounts
	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);

	// Return values and functions for component usage
	return { error, isPending, signInWithSocial };
};
