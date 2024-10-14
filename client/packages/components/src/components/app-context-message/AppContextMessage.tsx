import { useFavorites } from '@portal/core';
import styled from 'styled-components';
import { MessageCard } from '@portal/ui';
import { useFramework } from '@equinor/fusion-framework-react';

const Styles = {
	AppMessageWrapper: styled.div`
		padding: 1rem 0;
	`,
};

const APP_COUNT = 15;

export const AppContextMessage = () => {
	const { apps } = useFavorites();
	const { context } = useFramework().modules;
	return (
		<>
			{apps && apps.length < APP_COUNT && context.currentContext && (
				<Styles.AppMessageWrapper>
					<MessageCard
						title="Application and Context Expansion"
						messages={[
							"Currently, we're striving to expand the availability of applications to accommodate both facility and project contexts.",
							"Due to data and certain applications lacking support for all context types, we're unable to offer all applications for all contexts at this time.",
						]}
					/>
				</Styles.AppMessageWrapper>
			)}
		</>
	);
};
