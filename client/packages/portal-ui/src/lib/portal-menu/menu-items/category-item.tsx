import { css } from '@emotion/css';
import { styles } from '../styles';

interface MyComponentProps {
	name: string;
	onClick: (name: string) => void;
	isActive: boolean;
}

export const StyledCategoryItem: React.FC<MyComponentProps> = (props) => {
	const handleClick = () => {
		props.onClick(props.name);
	};

	return (
		<button className={(styles.menuItem, styles.categoryItem(props.isActive))} onClick={handleClick}>
			{props.name}
		</button>
	);
};

export default StyledCategoryItem;
