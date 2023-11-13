import s from './RegisterPage.module.css';
import { useState } from 'react';
import { SvgGoogle, SvgLogo } from 'assets/svg';
import TimezoneSelect from 'react-timezone-select';
import cn from 'classnames';

import { googleProvider } from '../../firebase/config';
import { useSocialSignup } from '../../hooks/useSocialSignup';

function RegisterPage() {
	const google = useSocialSignup(googleProvider);

	const [selectedTimezone, setSelectedTimezone] = useState(
		Intl.DateTimeFormat().resolvedOptions().timeZone,
	);

	const [fullName, setFullName] = useState('');
	const [age, setAge] = useState('');
	const [description, setDescription] = useState('');

	const handleFullName = (e) => {
		setFullName(e.target.value);
	};

	const handleAge = (e) => {
		setAge(e.target.value);
	};

	const handleDescription = (e) => {
		setDescription(e.target.value);
	};

	const handleLogin = (e) => {
		if (fullName !== '' && age !== '' && description !== '') {
			e.preventDefault();
			const userData = { name: fullName, age: age, description: description };
			google.signInWithSocial(userData);
		}
	};
	return (
		<div className={s.root}>
			<form>
				<div className={s.topContent}>
					<div className={s.logo}>
						<SvgLogo className="w-[150px] h-[40px]" />
					</div>
					<div className={s.content}>
						Your registration info cannot be modified during Challenge Period
					</div>
					<div className="flex items-center justify-center gap-[12px] mb-8">
						<div className="text-white text-[14px] sm:text-[16px] font-bold">
							Full Name:
						</div>
						<input
							type="text"
							value={fullName}
							onChange={handleFullName}
							className={s.input}
							required
						/>
					</div>
					<div className="flex items-center justify-center gap-[12px] mb-8">
						<div className="text-white text-[14px] sm:text-[16px] font-bold">
							Time Zone:
						</div>

						<div className={cn(s.select, 'select-wrapper')}>
							<TimezoneSelect
								value={selectedTimezone}
								onChange={setSelectedTimezone}
							/>
						</div>
					</div>
				</div>
				<div className={s.bottomContent}>
					<div className="p-3 w-full">
						<div className="text-black text-[16px] sm:text-[16px] font-medium my-3">
							Your Age:
						</div>
						<input
							type="text"
							value={age}
							onChange={handleAge}
							className={s.input2}
							required
						/>
					</div>
					<div className="p-3 w-full">
						<div className="text-black text-[16px] sm:text-[16px] font-medium my-3">
							Why did you decide to participate in the challenge?
						</div>
						<textarea
							rows={4}
							type="text"
							value={description}
							onChange={handleDescription}
							className={s.textField}
							required
						/>
					</div>
					<div className="w-full p-3 flex justify-center">
						<button
							onClick={handleLogin}
							className={cn(
								s.button,
								`flex items-center justify-center gap-3 w-full sm:w-[250px] h-[40px] px-[0px] py-[16px] bg-[#5f69bd] font-bold text-[#fff] text-[16px] rounded-[10px]`,
							)}
						>
							<SvgGoogle />
							Continue with Google
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default RegisterPage;
