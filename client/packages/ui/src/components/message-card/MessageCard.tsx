import { IconData, error_filled, warning_filled } from '@equinor/eds-icons';
import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export type Variant = 'Warning' | 'Error' | 'Info';

const getIconVariant = (type: Variant) => {
	const variant: Record<
		'Warning' | 'Error' | 'Info',
		{ data: IconData; color: string; backColor: string; type: Variant }
	> = {
		Error: {
			data: warning_filled,
			color: tokens.colors.interactive.danger__resting.rgba,
			backColor: tokens.colors.interactive.danger__highlight.hex,
			type: 'Error',
		},
		Warning: {
			data: error_filled,
			color: tokens.colors.interactive.warning__resting.rgba,
			backColor: tokens.colors.interactive.warning__highlight.hex,
			type: 'Warning',
		},
		Info: {
			data: error_filled,
			color: tokens.colors.infographic.primary__moss_green_100.rgba,
			backColor: tokens.colors.interactive.primary__selected_highlight.hex,
			type: 'Info',
		},
	};
	return variant[type];
};

export type Message = {
	type: 'Warning' | 'Error' | 'Info';
	title: string;
	messages?: { message: string }[];
};

export const Styled = {
	Banner: styled.div`
		position: relative;
		box-shadow: 0 2px 5px rgb(0 0 0 / 10%), 0 3px 4px rgb(0 0 0 / 10%), 0 2px 4px rgb(0 0 0 / 0%);
		gap: 0;
	`,
	StyledCardIndicator: styled.div<{ color: string }>`
		position: absolute;
		display: block;
		left: 0;
		width: 8px;
		height: 100%;
		background-color: ${({ color }) => color};
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
	`,
	Content: styled.div`
		padding: 1rem 1.5rem;
		display: flex;
		flex-direction: column;
	`,
	Header: styled.div`
		display: flex;
		flex-direction: row;
		align-items: center;
	`,
	Icon: styled.span<{ color: string }>`
		border-radius: 100px;
		background-color: ${({ color }) => color};
		width: 40px;
		height: 40px;
		margin-right: 16px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	`,
	UL: styled.ul`
		display: block;
		list-style-type: disc;
		margin-block-start: 1em;
		margin-block-end: 0px;
		margin-inline-start: 0px;
		margin-inline-end: 0px;
		padding-inline-start: 35px;
	`,
};

export const MessageCard = ({ title, messages, type = 'Info' }: Message) => {
	const variant = getIconVariant(type);

	return (
		<Styled.Banner role="banner" title={type}>
			<Styled.StyledCardIndicator color={variant.color} />
			<Styled.Content>
				<Styled.Header>
					<Styled.Icon color={variant.backColor} title="Icon">
						<Icon {...variant} />
					</Styled.Icon>
					{title}
				</Styled.Header>
				<Styled.UL>
					{messages?.map(({ message }, i) => (
						<li key={message || '' + i}>{message}</li>
					))}
				</Styled.UL>
			</Styled.Content>
		</Styled.Banner>
	);
};
