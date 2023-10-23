import s from './RegisterPage.module.css';
import { useState } from 'react';
import { SvgLogo } from 'assets/svg';
import Button from 'components/Button';
import { Link } from 'react-router-dom';
import TimezoneSelect from 'react-timezone-select';
import cn from 'classnames';

function RegisterPage() {
	const [selectedTimezone, setSelectedTimezone] = useState(
		Intl.DateTimeFormat().resolvedOptions().timeZone,
	);
	return (
		<div className={s.root}>
			<div className={s.logo}>
				<SvgLogo className="w-[150px] h-[40px]" />
			</div>
			<div className={s.content}>
				Your registration info cannot be modified during Challenge Period
			</div>
			<div className="flex items-center justify-center gap-[12px] mb-8">
				<div className="text-white text-[16px] font-bold">Full Name:</div>
				<input type="text" className={s.input} />
			</div>
			<div className="flex items-center justify-center gap-[12px] mb-8">
				<div className="text-white text-[16px] font-bold">Time Zone:</div>

				<div className={cn(s.select,"select-wrapper")}>
					<TimezoneSelect
						value={selectedTimezone}
						onChange={setSelectedTimezone}
					/>
				</div>
			</div>
			<Link to={'/kickoff'}>
				<Button w={200} h={40} title={'Continue'} />
			</Link>
		</div>
	);
}

export default RegisterPage;
