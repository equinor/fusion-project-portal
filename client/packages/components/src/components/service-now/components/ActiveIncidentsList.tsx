import styled from 'styled-components';
import { PortalMessage } from '@portal/ui';
import { useGetServiceNowIncidents } from '../hooks/use-service-now-query';
import { ProgressLoader } from '@equinor/portal-ui';
import { Button, Label, Typography } from '@equinor/eds-core-react';

export const Style = {
	Wrapper: styled.div`
		height: 65vh;
		display: flex;
		justify-content: center;
	`,
	IncidentsWrapper: styled.div`
		padding: 1rem 0rem;
		max-height: 65vh;
	`,
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
							<div key={item.id}>
								<Typography variant="h6">{item.shortDescription}</Typography>
								<Label label={item.state}></Label>

								<Button as={'a'} variant="ghost" href={item.link} target="_blank">
									{item.number}
								</Button>
							</div>
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
