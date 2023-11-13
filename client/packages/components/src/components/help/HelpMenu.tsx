import { Button, Icon, Menu } from '@equinor/eds-core-react';
import { file_description, help_outline, info_circle, launch, report_bug } from '@equinor/eds-icons';
import { useRef, useState } from 'react';
import styled from 'styled-components';

import { MenuItem } from '@portal/ui';

export const StyledItem = styled.div`
	min-width: 250px;
	padding-left: 0.5rem;
`;

export const StyledActionMenuButton = styled(Button)`
	height: 48px;
	width: 48px;
`;
export const HelpMenu = ({ setActiveActionById }: { setActiveActionById: (id: string) => void }) => {
	const topBarMenuAnchorEl = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleOnClick = () => {
		setIsOpen((s) => !s);
	};

	const handleCloseMenu = () => {
		setIsOpen(false);
	};

	return (
		<>
			<StyledActionMenuButton
				variant="ghost_icon"
				data-testid="menu-button"
				onClick={() => handleOnClick()}
				ref={topBarMenuAnchorEl}
				title="Help Menu"
			>
				<Icon data={info_circle} />
			</StyledActionMenuButton>
			<Menu
				id="menu-complex"
				aria-labelledby="anchor-complex"
				open={isOpen}
				anchorEl={topBarMenuAnchorEl.current}
				onClose={handleCloseMenu}
				placement="bottom-start"
			>
				<MenuItem
					iconData={report_bug}
					title="Report an error to service@equinor"
					onClick={() => {
						setActiveActionById('services');
					}}
				>
					Report an error
				</MenuItem>
				<MenuItem
					iconData={launch}
					title="Submit an improvement suggestion"
					link="https://equinor.service-now.com/selfservice?id=sc_cat_item&sys_id=32d7c0cddb2d630023a69407db961900"
				>
					Improvement suggestion
				</MenuItem>
				<MenuItem
					iconData={file_description}
					title="Project portal user documentation"
					link="https://equinor.github.io/fusion-project-portal-internal/docs/documentation/intro"
				>
					User Documentation
				</MenuItem>
				<Menu.Section title="">
					<MenuItem
						iconData={help_outline}
						title="Report an error to service@equinor"
						onClick={() => {
							setActiveActionById('help');
						}}
					>
						Help
					</MenuItem>
				</Menu.Section>
			</Menu>
		</>
	);
};

export default HelpMenu;
