import s from './Dashboard.module.css';
import Button from 'components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import 'react-clock/dist/Clock.css';
import { ref, onValue } from 'firebase/database';
import { database } from '../../firebase/config';
import { useAuthContext } from 'context/AuthContext';

const challengeData = [
	{ day: '1', isGetUp: true },
	{ day: '2', isGetUp: true },
	{ day: '3', isGetUp: true },
	{ day: '4', isGetUp: false },
	{ day: '5', isGetUp: true },
	{ day: '6', isGetUp: true },
	{ day: '7', isGetUp: true },
	{ day: '8', isGetUp: false },
	{ day: '9', isGetUp: true },
	{ day: '10', isGetUp: true },
	{ day: '11', isGetUp: true },
	{ day: '12', isGetUp: false },
	{ day: '13', isGetUp: false },
	{ day: '14', isGetUp: true },
	{ day: '15', isGetUp: true },
	{ day: '16', isGetUp: true },
	{ day: '17', isGetUp: true },
	{ day: '18', isGetUp: true },
	{ day: '19', isGetUp: true },
	{ day: '20', isGetUp: true },
	{ day: '21', isGetUp: true },
	{ day: '22', isGetUp: false },
	{ day: '23', isGetUp: true },
	{ day: '24', isGetUp: false },
	{ day: '25', isGetUp: true },
	{ day: '26', isGetUp: true },
	{ day: '27', isGetUp: true },
	{ day: '28', isGetUp: true },
	{ day: '29', isGetUp: true },
	{ day: '30', isGetUp: true },
];

function Dashboard() {
	const [value, setValue] = useState(new Date());
	const [isProfile, setIsProfile] = useState(true);
	const [fullName, setFullName] = useState('');
	const { user } = useAuthContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (user.isKickOff === false) {
			navigate('/kickoff');
		}
		const interval = setInterval(() => setValue(new Date()), 1000);

		return () => {
			clearInterval(interval);
		};
	}, [navigate, user.isKickOff]);

	useEffect(() => {
		const usersRef = ref(database, 'users/');
		onValue(usersRef, (snapshot) => {
			const data = snapshot.val();
			if (!!data) {
				data.forEach((userData) => {
					if (userData.email === user.email) {
						setFullName(userData.name);
					}
				});
			} else {
				console.log('Data not found');
			}
		});
	}, [fullName, user.email]);
	return (
		<div className={s.root}>
			{/* <Header /> */}
			<div className="w-full sm:w-fit flex justify-center items-center">
				<div
					className={cn(s.selectButton, isProfile ? s.active : '')}
					style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
					onClick={() => setIsProfile(true)}
				>
					Profile{' '}
				</div>
				<div
					className={cn(s.selectButton, !isProfile ? s.active : '')}
					style={{ borderTopRightRadius: 10, borderBottomRightRadius: 10 }}
					onClick={() => setIsProfile(false)}
				>
					Ask a question
				</div>
			</div>
			<div className={s.title}>Hi {fullName}.</div>
			<div className={s.title}>It is Day 20 of the challenge day</div>

			<div className="flex gap-8 text-[16px] font-bold">
				<p className="hidden sm:block text-[32px] font-bold my-4 text-black">
					{value.getHours() < 10
						? `0${value.getHours()}`
						: value.getHours() > 12
						? value.getHours() - 12
						: value.getHours()}
					:
					{value.getMinutes() < 10
						? `0${value.getMinutes()}`
						: value.getMinutes()}
					:
					{value.getSeconds() < 10
						? `0${value.getSeconds()}`
						: value.getSeconds()}
					{value.getHours() > 12 ? '  PM' : '  AM'}
				</p>
			</div>
			<Link to={'/dashboard'} className="w-full sm:w-fit mt-10">
				<Button title={'I Get Up'} />
			</Link>

			<Link
				className="w-full sm:w-[250px] mt-8"
				to={user.groupLink}
				target="_blank"
			>
				<div className="flex items-center justify-center py-3 text-[#000] bg-[#cdcdcd] text-[16px] font-bold rounded-md mb-20 cursor-pointer">
					Go to the challenge chat
				</div>
			</Link>
			<hr className="h-[3px] bg-black mb-6" />
			<div className="hidden sm:flex items-center justify-between w-[80%] lg:w-[60%] xl:w-[50%] my-10 text-black">
				<div className="flex items-center text-[16px] font-bold">
					Statistics
				</div>
				<div className="flex items-center text-[16px] font-bold  text-black">
					<div>Estimated Reward:&nbsp;</div>
					<div>75USD</div>
				</div>
			</div>

			<div className="sm:hidden bg-[#cdcdcd] py-4 w-full flex flex-col gap-3 justify-center items-center mb-8 rounded-[10px]">
				<div className="text-4xl text-bold text-black">75USD</div>
				<div className="text-lg text-black">Statistics Estimated Reward:</div>
			</div>

			<div className="flex flex-col items-start p-3 w-full lg:w-[60%] xl:w-[50%] mb-8">
				<div className="text-black mb-4">List of participants</div>
				<div className="flex flex-col bg-[#cdcdcd] rounded-[10px] w-full">
					<div
						className="flex items-center justify-center text-black bg-[#5f69bd] p-3"
						style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
					>
						<div className="w-1/3 text-center">You</div>
						<div className="w-1/3 text-center">1st</div>
						<div className="w-1/3 text-center">100 points</div>
					</div>
					<div className="flex items-center justify-center text-black p-3">
						<div className="w-1/3 text-center">John</div>
						<div className="w-1/3 text-center">2st</div>
						<div className="w-1/3 text-center">99 points</div>
					</div>
					<div className="flex items-center justify-center text-black p-3">
						<div className="w-1/3 text-center">John</div>
						<div className="w-1/3 text-center">3st</div>
						<div className="w-1/3 text-center">99 points</div>
					</div>
					<div className="flex items-center justify-center text-black p-3">
						<div className="w-1/3 text-center"></div>
						<div className="w-1/3 text-center"></div>
						<div className="w-1/3 text-center underline">more</div>
					</div>
				</div>
			</div>
			<div className="bg-[#cdcdcd] w-full flex items-center gap-6 md:gap-12 justify-center p-3 lg:w-[60%] xl:w-[50%] flex-wrap mb-12 rounded-[10px]">
				{challengeData.map((challenge) => (
					<div
						key={challenge.day}
						className={`text-[14px] ${
							challenge.isGetUp ? 'bg-[#5f69bd]' : 'bg-[#bd5f65]'
						} w-[20%] md:w-[10%] xl:w-[12%] text-black py-[4px] rounded-[10px] text-center`}
					>
						Day{challenge.day}
					</div>
				))}
			</div>
			{/* 
      <Footer /> */}
		</div>
	);
}

export default Dashboard;
