import Header from 'components/Layout/Header';
import s from './GroupsPage.module.css';
import { SvgLogo } from 'assets/svg';

const groupsData = [
	{ groupName: 'Group A', days: 2700 },
	{ groupName: 'Group B', days: 2650 },
	{ groupName: 'Group C', days: 2000 },
	{ groupName: 'Group D', days: 2800 },
];

function GroupsPage() {
	const maxDays = groupsData.reduce((max, group) => {
		return group.days > max ? group.days : max;
	}, 0);
	return (
		<div className={s.root}>
			<Header />
			<div className={s.title}>Completed Days</div>
			{groupsData.map((group) => (
				<div className="flex items-center justify-center gap-3 sm:gap-12 w-[80%] lg:w-[60%] xl:w-[50%] my-6">
					<div className="text-[14px] sm:text-[16px] font-bold w-[45%] sm:w-[25%]">
						{group.groupName}
					</div>
					<div className="bg-[#fff] h-[8px] w-full">
						<div
							className="bg-[#e9730e] h-[8px]"
							style={{ width: `${(group.days / maxDays) * 100}%` }}
						></div>
					</div>
					<div className="text-[14px] sm:text-[16px] font-bold w-[45%] sm:w-[25%]">
						{group.days}
					</div>
				</div>
			))}
			{/* 
      <Footer /> */}
		</div>
	);
}

export default GroupsPage;
