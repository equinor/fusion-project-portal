import { IconData } from '@equinor/eds-icons';
import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type Tab<Key> = { key: Key; title: string; route: string; description: string | FC; icon?: IconData };
export type TabsList<Key extends string> = Tab<Key>[];

export const useTabs = <Keys extends string, Key extends Keys>(tabs: TabsList<Key>, defaultTabKey: Key) => {
	const defaultTab = tabs.find((tab) => tab.key === defaultTabKey)!;
	const [activeTab, setActiveTab] = useState<Tab<Key>>(defaultTab);

	const { pathname } = useLocation();

	useEffect(() => {
		const match = tabs.find((tab) => pathname.endsWith(tab.route));
		if (match) {
			setActiveTab(match);
		} else if (defaultTab) {
			setActiveTab(defaultTab);
		}
	}, [pathname, tabs, defaultTab]);

	return { activeTab, setActiveTab };
};
