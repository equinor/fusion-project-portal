import { useOnboardedContextsDialog } from '@equinor/portal-core';
import { Button, Dialog } from '@equinor/eds-core-react';
import { PortalProgressLoader } from '@equinor/portal-ui';
import styled from 'styled-components';

type ContextNotAvailableDialogProps = {
	allowAllContext?: boolean;
};

const Style = {
	Wrapper: styled.div`
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 900;
		background-color: #fff;
	`,
};

export const ContextNotAvailableDialog = ({ allowAllContext }: ContextNotAvailableDialogProps) => {
	const { hasContext, clearContext, currentContext, isLoading } = useOnboardedContextsDialog(allowAllContext);

	if (currentContext && isLoading && !allowAllContext) {
		return (
			<Style.Wrapper>
				<PortalProgressLoader title="Validating Context" />;
			</Style.Wrapper>
		);
	}

	return (
		<Dialog
			style={{ width: '500px' }}
			isDismissable
			open={!hasContext}
			onClose={() => {
				clearContext();
			}}
		>
			<Dialog.Header>{currentContext?.title} not available.</Dialog.Header>
			<Dialog.Content>
				The selected {currentContext?.type.id.toLowerCase()} is not enabled, please contact a portal
				administrator
			</Dialog.Content>
			<Dialog.Actions>
				<Button
					onClick={() => {
						clearContext();
					}}
				>
					OK
				</Button>
			</Dialog.Actions>
		</Dialog>
	);
};
