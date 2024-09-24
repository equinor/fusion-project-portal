import { Popover, Typography, Chip, Icon } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { useState, useRef } from 'react';
import { styled } from 'styled-components';

const Styles = {
	Chip: styled(Chip)`
		background-color: ${tokens.colors.ui.background__info.rgba};
		padding: 0 0.5rem;
		margin: 0 1rem;
	`,
	Content: styled(Popover.Content)`
		display: flex;
		flex-direction: column;
		gap: 1rem;
	`,
	Ul: styled.ul`
		margin: 0 2rem;
		padding: 0;
	`,
};

export const DataClarification = () => {
	const [isOpen, setIsOpen] = useState(false);
	const handleOpen = () => {
		setIsOpen((s) => !s);
	};
	const handleClose = () => {
		setIsOpen(false);
	};
	const referenceElement = useRef<HTMLDivElement>(null);

	return (
		<>
			<Styles.Chip
				variant="active"
				aria-haspopup
				aria-expanded={isOpen}
				ref={referenceElement}
				onClick={handleOpen}
			>
				Internal Data Access <Icon data={info_circle} size={18} />
			</Styles.Chip>

			<Popover open={isOpen} anchorEl={referenceElement.current} draggable onClose={handleClose}>
				<Popover.Header>
					<Popover.Title>Internal Data Access</Popover.Title>
				</Popover.Header>
				<Styles.Content>
					<Typography>
						You are accessing data that is subject to strict handling and storage protocols. Please ensure
						you are familiar with Equinor’s information classification scheme as outlined in{' '}
						<a href="https://docmap.equinor.com/Docmap/page/doc/dmDocIndex.html?DOCID=1000023171">WR0158</a>
						.
					</Typography>
					<Typography>
						By proceeding, you acknowledge your responsibility in maintaining the confidentiality and
						appropriate handling of this information.
					</Typography>
					<div>
						<Typography variant="h6">By accessing this data, you agree to the following:</Typography>
						<Typography>
							<Styles.Ul>
								<li>To only use the data for its intended and authorized purpose.</li>
								<li>To not share the data with individuals who do not have the necessary clearance.</li>
							</Styles.Ul>
						</Typography>
					</div>
					<Typography>
						For further details on the classification and labelling of information, please refer to{' '}
						<a href="https://docmap.equinor.com/Docmap/page/doc/dmDocIndex.html?DOCID=1000026614">WR1211</a>{' '}
						- Information security, cyber security and privacy protection.
					</Typography>
				</Styles.Content>
			</Popover>
		</>
	);
};
