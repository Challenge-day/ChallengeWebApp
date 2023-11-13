import s from './LandingPage.module.css';
import { SvgLogo } from 'assets/svg';
import Button from 'components/Button';
import { Link } from 'react-router-dom';

function LandingPage() {
	return (
		<div className={s.root}>
			<div className={s.logo}>
				<SvgLogo className="w-[150px] h-[40px]" />
			</div>
			<div className={s.title}>Welcome To</div>
			<div className={s.title}>Wake Up Challenge</div>
			<div className={s.content}>
				Wake Up Challenge is built on the belief that challenges provide a
				powerful platform for personal growth, creativity, and connection.
			</div>
			<Link to={'/register'} className="w-full sm:w-[200px]">
				<Button w={200} h={40} title={"Let's Go"} />
			</Link>
			{/* 
      <Footer /> */}
		</div>
	);
}

export default LandingPage;
