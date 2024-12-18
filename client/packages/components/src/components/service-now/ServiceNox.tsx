import { useMemo, useState } from 'react';
import styled from 'styled-components';
import ActiveIncidents from './components/ActiveIncidents';
import { HelpNeeded } from './components/Help';
import { NewIncident } from './components/NewIncident';

const Styles = {
	Wrapper: styled.div`
		padding-bottom: 1rem;
	`,
};

export const ServiceNow = () => {
	const [activeTab, setTab] = useState<'ActiveIncident' | 'NewIncident' | 'HelpNeeded'>('ActiveIncident');

	const tabs = useMemo(
		() => ({
			ActiveIncident: (
				<ActiveIncidents
					openNewIncident={() => {
						setTab('NewIncident');
					}}
					openNeedHelp={() => {
						setTab('HelpNeeded');
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
			HelpNeeded: (
				<HelpNeeded
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
