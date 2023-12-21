import { Button, Icon, Tooltip } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { ReactNode, useState } from 'react';
import styled from 'styled-components';

const Styles = {
	Icon: styled.span`
		color: ${tokens.colors.text.static_icons__tertiary.hex};
		padding-left: 0.5rem;
	`,
	Link: styled.a<{ disabled?: boolean }>`
		cursor: pointer;
		align-items: center;
		display: flex;
		color: ${tokens.colors.interactive.primary__resting.hex};
		align-items: center;
		:hover {
			background-color: ${tokens.colors.interactive.primary__hover_alt.hex};
		}
		height: 38px;
		padding: 0.5rem;
		border-radius: 4px;
		cursor: ${({ disabled }) => disabled && 'not-allowed'};
	`,
	LinkContent: styled.div`
		display: flex;
		gap: 1rem;
		width: 100%;
		align-items: center;
	`,
};

type ProfileListItemProps = {
	href?: string;
	title: string;
	text: string;
	toCopy?: string;
	icon: ReactNode;
};
type copyContent = {
	success: boolean;
	text: string;
};

export const ProfileListItem = ({ href, title, text, icon, toCopy }: ProfileListItemProps) => {
	const [copySuccess, setCopySuccess] = useState<copyContent>({
		success: false,
		text: `Copy ${title}`,
	});
	const [showCopy, setShowCopy] = useState<boolean>(false);

	return (
		<Styles.Link
			href={href}
			target="_blank"
			title={title}
			disabled={!toCopy}
			onMouseEnter={() => {
				setShowCopy(true);
			}}
			onMouseLeave={() => {
				setShowCopy(false);
			}}
		>
			<Styles.LinkContent>
				<Styles.Icon>{icon}</Styles.Icon>
				{text}
			</Styles.LinkContent>
			{toCopy ? (
				<Button
					aria-label="copy_content"
					title={`Copy ${toCopy}`}
					variant="ghost_icon"
					onClick={async (e) => {
						e.preventDefault();
						e.stopPropagation();
						if ('clipboard' in navigator) {
							await navigator.clipboard.writeText(toCopy);
							setCopySuccess({
								success: true,
								text: 'Successfully copied',
							});
							setTimeout(() => {
								setCopySuccess({
									success: false,
									text: `Copy ${title}`,
								});
							}, 1000);
						}
					}}
					disabled={copySuccess.success}
				>
					{showCopy && (
						<Tooltip title={copySuccess.text}>
							{copySuccess.success ? (
								<Icon name="done" size={18} style={{ color: '#2e7d32' }} />
							) : (
								<Icon name="copy" size={18} style={{}} />
							)}
						</Tooltip>
					)}
				</Button>
			) : null}
		</Styles.Link>
	);
};
