import s from './Header.module.css';

import cn from 'classnames';
import { SvgLogo } from 'assets/svg';
import { Link } from 'react-router-dom';

const Header = () => {
	const navLinks = [
		{ label: 'Dashboard', link: '/dashboard', active: true },
		{ label: 'Groups', link: '/groups' },
		{ label: 'Chat Room', link: '/chatrooms' },
		{ label: 'Profile', link: '/profile' },
	];
	return (
		<div className={s.root}>
			<nav className={s.nav}>
				<SvgLogo className={cn(s.logo)} />
				<div className={s.itemsWrapper}>
					{navLinks.map((link, index) => (
						<Link to={link.link} key={link.label}>
							<div className={cn(s.item)} key={index}>
								{link.label}
							</div>
						</Link>
					))}
				</div>
			</nav>
		</div>
	);
};

export default Header;
