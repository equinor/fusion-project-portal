import { Icon } from '@equinor/eds-core-react';
import { external_link } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { ReactNode, useState } from 'react';
import styled from 'styled-components';

const Styles = {
	Icon: styled.span`
		color: ${tokens.colors.text.static_icons__tertiary.hex};
	`,
	ExternalIcon: styled.span`
		color: ${tokens.colors.text.static_icons__tertiary.hex};
		padding-right: 0.5rem;
	`,
	Link: styled.a`
		cursor: pointer;
		display: flex;
		color: ${tokens.colors.interactive.primary__resting.hex};
		align-items: center;
		padding: 0.5rem;
		width: calc(100% - 0.5rem);
		border-radius: 4px;
		:hover {
			background-color: ${tokens.colors.interactive.primary__hover_alt.hex};
		}
		height: 28px;
	`,
	LinkContent: styled.div`
		display: flex;
		gap: 1rem;
		width: 100%;
		align-items: center;
	`,
};

type ExternalLinkProps = {
	href: string;
	title: string;
	text: string;
	icon?: ReactNode;
};

export const ExternalLink = ({ href, title, text, icon }: ExternalLinkProps) => {
	const [hover, setHover] = useState(false);
	return (
		<Styles.Link
			href={href}
			target="_blank"
			title={title}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			<Styles.LinkContent>
				{icon && <Styles.Icon>{icon}</Styles.Icon>}
				{text}
			</Styles.LinkContent>
			<Styles.ExternalIcon>{hover && <Icon data={external_link} size={18} />}</Styles.ExternalIcon>
		</Styles.Link>
	);
};
