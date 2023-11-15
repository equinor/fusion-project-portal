import styled from 'styled-components';
import { PortalMessage } from '@portal/ui';
import { useGetServiceNowIncidents } from '../hooks/use-service-now-query';
import { ProgressLoader } from '@equinor/portal-ui';
import { ActiveIncidentsItem } from './ActiveIncidentsItem';

export const Style = {
	Wrapper: styled.div`
		max-height: 75vh;
		min-height: 35vh;
		overflow: auto;
	`,
	WrapperCenter: styled.div`
		height: 75vh;
		display: flex;
		justify-content: center;
	`,
	NoContent: styled.div`
		height: 35vh;
		display: flex;
		justify-content: center;
	`,
	IncidentsWrapper: styled.div`
		padding: 1rem 0rem;
		max-height: 75vh;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	`,
};

export const ActiveIncidentsList = () => {
	const { data, isLoading, error } = useGetServiceNowIncidents();

	if (isLoading) {
		return (
			<Style.WrapperCenter>
				<ProgressLoader title="loading" />
			</Style.WrapperCenter>
		);
	}

	if (error) {
		return (
			<Style.WrapperCenter>
				<PortalMessage type="Error" title={error.title}></PortalMessage>
			</Style.WrapperCenter>
		);
	}

	return (
		<Style.Wrapper>
			{data && data.length > 0 ? (
				<Style.IncidentsWrapper>
					{data.map((item) => (
						<ActiveIncidentsItem {...item} />
					))}
				</Style.IncidentsWrapper>
			) : (
				<Style.NoContent>
					<PortalMessage type="NoContent" title="No active errors">
						You have no active errors
					</PortalMessage>
				</Style.NoContent>
			)}
		</Style.Wrapper>
	);
};
