import styled from 'styled-components';
import { Card } from '@equinor/eds-core-react';

import { useRouterConfigContext } from '../../context/RouterContext';
import { RouterRoot } from './RouterRoot';
import { RouteForm } from './RouteForm';
import { RouterConfig } from './RouterConfig';
import { Message } from '../Message';

const Style = {
	Wrapper: styled.div`
		gap: 1rem;
		display: flex;
		padding: 1rem 0;
		width: 100%;
		flex-direction: column;
	`,
	Content: styled.div`
		padding: 0 1rem;
		gap: 1rem;
		display: flex;

		flex-direction: column;
	`,
	CodeContent: styled.div`
		padding: 0 1rem;
		gap: 1rem;
		display: flex;

		flex-direction: column;
	`,
	Full: styled.div`
		width: 100%;
	`,
	CardContent: styled(Card.Content)`
		padding: 1rem;
	`,
};

export const RouterEdit = () => {
	const { rootActive, configActive } = useRouterConfigContext();

	return (
		<Style.Full>
			{configActive ? (
				<Style.CodeContent>
					<RouterConfig />
					<Card>
						<Style.CardContent>
							<Message
								title="Configuration"
								messages={['This is used for developers to ensure the configuration is proper']}
							/>
						</Style.CardContent>
					</Card>
				</Style.CodeContent>
			) : (
				<Style.Wrapper>
					{rootActive ? (
						<Style.Content>
							<RouterRoot />
						</Style.Content>
					) : (
						<Style.Content>
							<RouteForm />
						</Style.Content>
					)}
				</Style.Wrapper>
			)}
		</Style.Full>
	);
};
