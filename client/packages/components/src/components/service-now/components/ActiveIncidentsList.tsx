import styled from 'styled-components';
import { PortalMessage } from '@portal/ui';
import { useGetServiceNowIncidents } from '../hooks/use-service-now-query';
import { ProgressLoader } from '@equinor/portal-ui';
import { Button, Icon, Label, Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { external_link } from '@equinor/eds-icons';

export const Style = {
	Wrapper: styled.div`
		height: 65vh;
		display: flex;
		justify-content: center;
	`,
	IncidentsWrapper: styled.div`
		padding: 1rem 0rem;
		max-height: 65vh;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	`,
	IncidentItem: styled.div`
		display: flex;
		position: relative;
		box-shadow: 0 2px 5px rgb(0 0 0 / 10%), 0 3px 4px rgb(0 0 0 / 10%), 0 2px 4px rgb(0 0 0 / 0%);
		width: calc(100% - 3rem);
		padding: 1rem;
		align-items: center;
		justify-content: space-between;
	`,
	IncidentIndicator: styled.span<{ color: string }>`
		position: absolute;
		display: block;
		left: 0;
		width: 8px;
		height: 100%;
		background-color: ${({ color }) => color};
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
	`,
	IncidentContent: styled.div`
		padding-left: 1rem;
	`,
};

export const getIncidentColorByState = (state: string): string => {
	switch (state) {
		case 'Open':
			return `${tokens.colors.interactive.danger__resting.hex}`;
		case 'Work in Progress':
			return `${tokens.colors.interactive.secondary__resting.hex}`;
		case 'Pending Vendor':
			return `${tokens.colors.interactive.warning__resting.hex}`;
		case 'Solution Proposed':
			return `${tokens.colors.interactive.success__resting.hex}`;
		default:
			return `${tokens.colors.interactive.disabled__fill.hex}`;
	}
};

export const ActiveIncidentsList = () => {
	const { data, isLoading, error } = useGetServiceNowIncidents();

	if (isLoading) {
		return (
			<Style.Wrapper>
				<ProgressLoader title="loading" />
			</Style.Wrapper>
		);
	}

	if (error) {
		return (
			<Style.Wrapper>
				<PortalMessage type="Error" title={error.title}></PortalMessage>
			</Style.Wrapper>
		);
	}

	return (
		<div style={{ maxHeight: '60vh', overflow: 'auto' }}>
			{data && data.length > 0 ? (
				<Style.IncidentsWrapper>
					{data.map((item) => {
						return (
							<Style.IncidentItem key={item.id}>
								<Style.IncidentIndicator color={getIncidentColorByState(item.state)} />
								<div>
									<Button as={'a'} variant="ghost" href={item.link} target="_blank" fullWidth>
										{item.number}
									</Button>

									<Style.IncidentContent>
										<Typography variant="h6">{item.shortDescription}</Typography>
										<Typography variant="overline">Status: {item.state}</Typography>
									</Style.IncidentContent>
								</div>
								<Button variant="ghost_icon" as={'a'} href={item.link} target="_blank">
									<Icon data={external_link} />
								</Button>
							</Style.IncidentItem>
						);
					})}
				</Style.IncidentsWrapper>
			) : (
				<Style.Wrapper>
					<PortalMessage type="NoContent" title="No active errors">
						You have no active errors
					</PortalMessage>
				</Style.Wrapper>
			)}
		</div>
	);
};
