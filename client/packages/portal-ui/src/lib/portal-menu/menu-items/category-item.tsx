import { StyledItemToggled, StyledItem } from './CategoryStyles';

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
		<>
			{props.isActive ? (
				<StyledItemToggled onClick={handleClick}>
					<p>{props.name}</p>
				</StyledItemToggled>
			) : (
				<StyledItem onClick={handleClick}>
					<p>{props.name}</p>
				</StyledItem>
			)}
		</>
	);
};

export default StyledCategoryItem;
