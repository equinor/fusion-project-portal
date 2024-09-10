import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useTabs = <Keys extends string, Key extends Keys>(keys: Keys[], defaultTab?: Key) => {
	const tabMap = useMemo(
		() =>
			keys.reduce((map, key, index) => {
				Object.assign(map, { [key]: index });
				return map;
			}, {} as Record<Keys, number>),
		[]
	);

	const [activeTab, setActiveTabIndex] = useState(defaultTab ? tabMap[defaultTab] : 0);

	let [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		const tab = searchParams.get('tab');
		if (tab && Object.keys(tabMap).includes(tab)) {
			setActiveTabIndex(tabMap[tab as Keys]);
		} else if (defaultTab) {
			setSearchParams({ tab: defaultTab });
		}
	}, [searchParams, tabMap, defaultTab]);

	const onTabChange = (index: number) => {
		setActiveTabIndex(index);
		const tab = Object.keys(tabMap).find((key) => tabMap[key as Keys] === index);
		if (tab) setSearchParams({ tab });
	};

	const setActiveTab = (tab: Keys) => {
		setActiveTabIndex(tabMap[tab]);
	};

	return { onTabChange, setActiveTab, activeTab };
};
