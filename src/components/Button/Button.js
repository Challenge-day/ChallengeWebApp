import s from './Button.module.css';
import cn from 'classnames';

const Button = ({
	w,
	h,
	px = 0,
	py = 16,
	bg = '#fff',
	title,
	size = 16,
	color = '#25318d',
	rounded = 20,
}) => {
	return (
		<div
			className={cn(
				s.button,
				`w-full sm:w-[250px] h-[40px] px-[0px] py-[16px] bg-[#5f69bd] font-bold text-[#fff] text-[20px] rounded-[10px]`,
			)}
		>
			{title}
		</div>
	);
};

export default Button;
