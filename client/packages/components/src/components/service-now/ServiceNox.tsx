import { useMemo, useState } from 'react';
import styled from 'styled-components';
import ActiveIncidents from './components/ActiveIncidents';
import { NewIncident } from './components/NewIncident';

const Styles = {
	Wrapper: styled.div`
		padding-top: 1rem;
		padding-bottom: 1rem;
	`,
};

export const ServiceNow = () => {
	const [activeTab, setTab] = useState<'ActiveIncident' | 'NewIncident'>('ActiveIncident');

	const tabs = useMemo(
		() => ({
			ActiveIncident: (
				<ActiveIncidents
					openNewIncident={() => {
						setTab('NewIncident');
					}}
				/>
			),
			NewIncident: (
				<NewIncident
					onClose={() => {
						setTab('ActiveIncident');
					}}
				/>
			),
		}),
		[]
	);

	return <Styles.Wrapper>{tabs[activeTab]}</Styles.Wrapper>;
};
