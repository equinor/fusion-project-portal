import { styled } from 'styled-components';
import { Loading } from '../components/Loading';
import { PortalTable } from '../components/Portals/PortalTable';
import { usePortalsQuery } from '../hooks/use-portals-query';
import { useAccess } from '../hooks/use-access';

const Style = {
	Wrapper: styled.div`
		height: calc(100% - 6rem);
		width: 100%;
		position: absolute;
	`,
	Content: styled.div`
		width: 100%;
		height: -webkit-fill-available;
	`,
};

export const PortalList = () => {
	const { isLoading, data: portalsData } = usePortalsQuery();

	if (isLoading) {
		return <Loading detail="Loading Portals" />;
	}
	return (
		<Style.Content>
			<PortalTable portalsData={portalsData} />
		</Style.Content>
	);
};
