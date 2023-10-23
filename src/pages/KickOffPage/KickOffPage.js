import s from './KickOffPage.module.css';
import { SvgLogo } from 'assets/svg';
import Button from 'components/Button';
import { Link } from 'react-router-dom';
import cn from 'classnames';

function KickOffPage() {
	return (
		<div className={s.root}>
			<div className={s.logo}>
				<SvgLogo className="w-[150px] h-[40px]" />
			</div>
			<div className={s.title}>Well Done!</div>
			<div className={s.subTitle}>
				You are in Group X and the challenge is to wake up at 6AM every day.
			</div>
			<Link to={'/dashboard'}>
				<Button w={200} h={40} title={'Start Challenge'} />
			</Link>
			<div
				className={cn(
					s.content,
					'mt-24 w-[70%] sm:w-[40%] md:w-[20%] text-left',
				)}
			>
				Do you Know?
			</div>
			<div className={cn('pl-4', s.content)}>Group A is for ... ... ...</div>
			<div className={cn('pl-4', s.content)}>Group B is for ... ... ...</div>
			<div className={cn('pl-4', s.content)}>Group C is for ... ... ...</div>
			<div className={cn('pl-4', s.content)}>Group D is for ... ... ...</div>
		</div>
	);
}

export default KickOffPage;
