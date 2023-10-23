import s from './Dashboard.module.css';
import Button from 'components/Button';
import { Link } from 'react-router-dom';
import Header from 'components/Layout/Header';
import { useEffect, useState } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

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

	useEffect(() => {
		const interval = setInterval(() => setValue(new Date()), 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);
	return (
		<div className={s.root}>
			<Header />
			<div className={s.title}>Hi John. It is Day 20 of the challenge day</div>

			<div className="flex gap-8 text-[16px] font-bold">
				<p className="text-[32px] font-bold my-4">
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
			<Link to={'/dashboard'}>
				<Button w={200} h={40} title={'I Get Up'} />
			</Link>
			<div className="flex items-center justify-between w-[80%] lg:w-[60%] xl:w-[50%] my-10">
				<div className="flex items-center text-[16px] font-bold">
					Statistics
				</div>
				<div className="flex items-center text-[16px] font-bold">
					<div>EstimatedReward:&nbsp;</div>
					<div>75USD</div>
				</div>
			</div>
			<div className="flex items-center gap-12 justify-center w-[80%] lg:w-[60%] xl:w-[50%] flex-wrap mb-12">
				{challengeData.map((challenge) => (
					<div
						key={challenge.day}
						className={`text-[14px] ${
							challenge.isGetUp ? 'font-bold' : 'font-normal'
						} ${
							challenge.isGetUp ? 'text-white' : 'text-gray-800'
						} w-[10%] xl:w-[12%]`}
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
