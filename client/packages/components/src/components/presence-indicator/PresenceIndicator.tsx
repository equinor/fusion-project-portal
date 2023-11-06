import { useMemo } from 'react';
import { getPresenceInfo } from './utils/parse-presence-status';
import { usePresenceQuery } from './hooks/use-presence-query';
import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	padding: 0 1rem;
`;

export const PresenceIndicator = () => {
	const { data } = usePresenceQuery();
	const { icon, status } = useMemo(() => getPresenceInfo(data?.availability), [data]);

	return (
		<Wrapper>
			{icon}
			<span>{status}</span>
		</Wrapper>
	);
};
