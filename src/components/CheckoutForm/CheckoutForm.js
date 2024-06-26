import { useEffect, useState } from 'react';
import {
	PaymentElement,
	useStripe,
	useElements,
} from '@stripe/react-stripe-js';
import s from './CheckoutForm.module.css';
import { useAuthContext } from 'context/AuthContext';

export default function CheckoutForm() {
	const stripe = useStripe();
	const elements = useElements();

	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const { user, dispatch } = useAuthContext();

	useEffect(() => {
		if (!stripe) {
			return;
		}

		const clientSecret = new URLSearchParams(window.location.search).get(
			'payment_intent_client_secret',
		);

		if (!clientSecret) {
			return;
		}

		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
			switch (paymentIntent.status) {
				case 'succeeded':
					setMessage('Payment succeeded!');
					break;
				case 'processing':
					setMessage('Your payment is processing.');
					break;
				case 'requires_payment_method':
					setMessage('Your payment was not successful, please try again.');
					break;
				default:
					setMessage('Something went wrong.');
					break;
			}
		});
	}, [dispatch, message, stripe, user]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js hasn't yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}

		setIsLoading(true);

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				// Make sure to change this to your payment completion page
				return_url: 'http://localhost:3000/kickoff',
			},
		});
		// This point will only be reached if there is an immediate error when
		// confirming the payment. Otherwise, your customer will be redirected to
		// your `return_url`. For some payment methods like iDEAL, your customer will
		// be redirected to an intermediate site first to authorize the payment, then
		// redirected to the `return_url`.
		if (error.type === 'card_error' || error.type === 'validation_error') {
			setMessage(error.message);
		} else {
			setMessage('An unexpected error occurred.');
		}

		setIsLoading(false);
	};

	const paymentElementOptions = {
		layout: 'tabs',
	};

	return (
		<form id="payment-form" className={s.paymentForm} onSubmit={handleSubmit}>
			<PaymentElement
				id="payment-element"
				className={s.paymentElement}
				options={paymentElementOptions}
			/>
			<button
				disabled={isLoading || !stripe || !elements}
				id="submit"
				className={s.payButton}
			>
				<span id="button-text">
					{isLoading ? (
						<div className={s.spinner} id="spinner"></div>
					) : (
						'Pay now'
					)}
				</span>
			</button>
			{/* Show any error or success messages */}
			{message && (
				<div id="payment-message" className={s.paymentMessage}>
					{message}
				</div>
			)}
		</form>
	);
}
