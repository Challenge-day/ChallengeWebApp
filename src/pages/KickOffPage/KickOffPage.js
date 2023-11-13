import s from './KickOffPage.module.css';
import { SvgAppStore, SvgGooglePlay, SvgLogo } from 'assets/svg';
import Button from 'components/Button';
import { Link, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { useAuthContext } from 'context/AuthContext';
import { useEffect, useState } from 'react';
import { ref, update } from 'firebase/database';
import { database } from '../../firebase/config';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../../components/CheckoutForm';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const stripePromise = loadStripe(
	process.env.REACT_APP_STRIPE_TEST_PUBLISHABLE_KEY,
);
function KickOffPage() {
	const [clientSecret, setClientSecret] = useState('');
	const options = {
		// passing the client secret obtained from the server
		clientSecret,
	};

	const { user } = useAuthContext();
	const navigate = useNavigate();
	const { dispatch } = useAuthContext();

	const [open, setOpen] = useState(false);
	const [paymentIntent, setPaymentIntent] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		if (user.isKickOff === true) {
			navigate('/dashboard');
		}
	}, [navigate, user.isKickOff]);

	useEffect(() => {
		const checkPaymentStatus = async () => {
			const paymentIntentStr = new URLSearchParams(window.location.search).get(
				'payment_intent',
			);
			setPaymentIntent(paymentIntentStr);
			if (paymentIntentStr) {
				setIsLoading(true);
				await fetch(
					`https://api.stripe.com/v1/payment_intents/${paymentIntentStr}`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${process.env.REACT_APP_STRIPE_TEST_SECRET_KEY}`,
							'Content-Type': 'application/x-www-form-urlencoded',
						},
					},
				)
					.then((response) => response.json())
					.then((data) => {
						if (data.status === 'succeeded') {
							const updates = {};
							updates['users/' + user.userIndex] = { ...user, isKickOff: true };
							update(ref(database), updates)
								.then(() => {
									user.isKickOff = true;
									dispatch({ type: 'AUTH_IS_READY', payload: user });
									navigate('/dashboard');
								})
								.catch((error) => {
									console.log(error);
								});
						}
					})
					.catch((error) => {
						// Handle any errors
						console.error(error);
					});

				setIsLoading(false);
			}
		};
		checkPaymentStatus();
	}, [dispatch, navigate, user]);

	const onContinue = async () => {
		if (user.groupName === 'B') {
			fetch('https://api.stripe.com/v1/payment_intents', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${process.env.REACT_APP_STRIPE_TEST_SECRET_KEY}`,
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: new URLSearchParams({
					amount: '500',
					currency: 'USD',
					'automatic_payment_methods[enabled]': 'true',
				}),
			})
				.then((response) => response.json())
				.then((data) => {
					// Handle the response data
					setClientSecret(data.client_secret);
					setOpen(true);
				})
				.catch((error) => {
					// Handle any errors
					console.error(error);
				});
		} else {
			const updates = {};
			updates['users/' + user.userIndex] = { ...user, isKickOff: true };
			setIsLoading(true);
			await update(ref(database), updates)
				.then(() => {
					user.isKickOff = true;
					dispatch({ type: 'AUTH_IS_READY', payload: user });
				})
				.catch((error) => {
					console.log(error);
				});
			setIsLoading(false);
		}
	};

	return (
		<div className={s.root}>
			{paymentIntent === null && (
				<>
					<div className={s.logo}>
						<SvgLogo className="w-[150px] h-[40px]" />
					</div>
					<div className={s.subTitle}>
						Since this is a test project, we have implemented communication
						between users in the telegram messenger
					</div>
					<div className="flex items-center justify-center gap-6 w-full">
						<Link
							className="w-full sm:w-[200px]"
							to={
								'https://play.google.com/store/apps/details?id=org.telegram.messenger&hl=en&gl=US'
							}
							target="_blank"
						>
							<div className={cn(s.link, 'h-[60px]')}>
								<SvgGooglePlay />
							</div>
						</Link>
						<Link
							className="w-full sm:w-[200px]"
							to={
								'https://apps.apple.com/us/app/telegram-messenger/id686449807'
							}
							target="_blank"
						>
							<div className={cn(s.link, 'h-[60px]')}>
								<SvgAppStore />
							</div>
						</Link>
					</div>
					<div className={s.content}>
						Download Telegram for your platform, and then return to this page
						and join your group.
					</div>
					<Link
						className="w-full sm:w-[250px]"
						to={user.groupLink}
						target="_blank"
					>
						<div className="flex items-center justify-center py-3 text-[#000] bg-[#cdcdcd] text-[16px] font-bold rounded-md mb-20 cursor-pointer">
							Go to the challenge chat
						</div>
					</Link>
					<div className={s.content}>
						Every day you nuo will mark your rise in the web version, so save it
						in bookmarks
					</div>
					<div onClick={onContinue} className="w-full sm:w-[250px]">
						<Button
							w={200}
							h={40}
							title={
								user.groupName === 'B' ? 'Pay 5$ and Continue' : 'Continue'
							}
						/>
					</div>
					<Dialog
						open={open}
						onClose={handleClose}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
					>
						<DialogTitle id="alert-dialog-title">
							{'Pay To Continue'}
						</DialogTitle>
						<DialogContent className={s.payContent}>
							{clientSecret && (
								<div className={s.product}>
									<Elements stripe={stripePromise} options={options}>
										<CheckoutForm />
									</Elements>
								</div>
							)}
						</DialogContent>
					</Dialog>
				</>
			)}
			{isLoading && (
				<div
					role="status"
					className="w-full h-full absolute flex items-center justify-center top-0 left-0 bg-[#ffffffb3]"
				>
					<svg
						aria-hidden="true"
						className="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
						viewBox="0 0 100 101"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
							fill="currentColor"
						/>
						<path
							d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
							fill="currentFill"
						/>
					</svg>
					<span className="sr-only">Loading...</span>
				</div>
			)}
		</div>
	);
}

export default KickOffPage;
