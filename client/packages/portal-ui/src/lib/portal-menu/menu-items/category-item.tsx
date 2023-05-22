import { ItemToggled, Item } from './CategoryStyles';

interface MyComponentProps {
	name: string;
	onClick: (name: string) => void;
    isActive: boolean;
}

export const CategoryItem: React.FC<MyComponentProps> = (props) => {
    const handleClick = () => {

          props.onClick(props.name);
        
      };

	return (
		<>
			{props.isActive ? (
				<ItemToggled onClick={handleClick}>
					<p>{props.name}</p>
				</ItemToggled>
			) : (
				<Item onClick={handleClick}>
					<p>{props.name}</p>
				</Item>
			)}
		</>
	);
};

export default CategoryItem;
