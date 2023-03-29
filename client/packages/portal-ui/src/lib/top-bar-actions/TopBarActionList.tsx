import { Icon } from '@equinor/eds-core-react';
import { Tooltip } from '@equinor/fusion-react-tooltip';
import { tokens } from '@equinor/eds-tokens';
import { PortalAction, useTopBarActions } from '@equinor/portal-core';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { StyledActionListWrapper, StyledActionMenuButton } from './TopBarActionStyles';
import { Divider } from '../divider/Divider';

interface ConditionalWrapperProps {
	condition: boolean;
	wrapper: FC<PropsWithChildren<unknown>>;
}

const ConditionalWrapper = ({ condition, children, ...props }: PropsWithChildren<ConditionalWrapperProps>) =>
	// eslint-disable-next-line react/jsx-no-useless-fragment
	condition ? <props.wrapper>{children}</props.wrapper> : <>{children}</>;

export function TopBarActionList(): JSX.Element {
	const { topBarActions$, setActiveActionById } = useTopBarActions();

	const [topBarActions, setTopBarActions] = useState<PortalAction[]>([]);

	useEffect(() => {
		const topBarActionsSubscription = topBarActions$.subscribe(setTopBarActions);
		return () => {
			topBarActionsSubscription.unsubscribe();
		};
	}, [topBarActions$]);

	return (
		<>
			{topBarActions.map((action, index) => {
				if (action.dropDownOnly) return <span key={action.actionId}></span>;

				const customIcon =
					typeof action.icon === 'string' ? (
						<Icon color={tokens.colors.interactive.primary__resting.hex} name={action.icon} />
					) : (
						<action.icon.component />
					);

				return (
					<StyledActionListWrapper key={action.actionId}>
						<ConditionalWrapper
							condition={!!action.tooltip}
							wrapper={({ children }) => (
								<Tooltip content={action.tooltip ? action.tooltip : action.name}>
									<span>{children}</span>
								</Tooltip>
							)}
						>
							<StyledActionMenuButton
								title={!action.tooltip ? action.name : undefined}
								variant="ghost_icon"
								onClick={() => {
									action.onClick
										? action.onClick(action.actionId)
										: setActiveActionById(action.actionId);
								}}
							>
								{customIcon}
							</StyledActionMenuButton>
						</ConditionalWrapper>
						{action.appendDivider && !!topBarActions[index + 1] && <Divider />}
					</StyledActionListWrapper>
				);
			})}
			{topBarActions.length > 0 && <Divider />}
		</>
	);
}
