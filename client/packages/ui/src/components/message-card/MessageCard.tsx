import styled from 'styled-components';
import { PropsWithChildren } from 'react';
import { Message, MessageProps, getIconVariant } from '../message/Message';
import { tokens } from '@equinor/eds-tokens';

const Styled = {
	Banner: styled.div`
		position: relative;
		box-shadow: 0 2px 5px rgb(0 0 0 / 10%), 0 3px 4px rgb(0 0 0 / 10%), 0 2px 4px rgb(0 0 0 / 0%);
		gap: 0;
		background: ${tokens.colors.ui.background__default.hex};
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
};

export const MessageCard = ({ title, messages, type = 'Info', children }: PropsWithChildren<MessageProps>) => {
	const variant = getIconVariant(type);

	return (
		<Styled.Banner role="banner" title={type}>
			<Styled.StyledCardIndicator color={variant.color} />
			<Message title={title} messages={messages} type={type}>
				{children}
			</Message>
		</Styled.Banner>
	);
};
