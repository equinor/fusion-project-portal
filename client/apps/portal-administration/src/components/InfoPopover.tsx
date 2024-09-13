import { Button, Popover, Icon } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import { useState, useRef, PropsWithChildren } from 'react';

export const InfoPopover = ({ children, title }: PropsWithChildren<{ title: string }>) => {
	const [isOpen, setIsOpen] = useState(false);
	const handleOpen = () => {
		setIsOpen((s) => !s);
	};
	const handleClose = () => {
		setIsOpen(false);
	};
	const referenceElement = useRef<HTMLButtonElement>(null);

	return (
		<>
			<Button
				aria-haspopup
				aria-expanded={isOpen}
				variant="ghost_icon"
				ref={referenceElement}
				onClick={(event) => {
					event.stopPropagation();
					handleOpen();
				}}
			>
				<Icon data={info_circle} size={18} />
			</Button>

			<Popover open={isOpen} anchorEl={referenceElement.current} draggable onClose={handleClose}>
				<Popover.Header>
					<Popover.Title>{title}</Popover.Title>
				</Popover.Header>
				<Popover.Content>{children}</Popover.Content>
			</Popover>
		</>
	);
};
