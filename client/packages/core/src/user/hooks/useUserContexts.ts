import { useFramework } from '@equinor/fusion-framework-react';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { RelationReturnType, Relations } from '../../context';
import { useCurrentUser } from './useUserInfo';

import { from, lastValueFrom, map, mergeMap, reduce, switchMap } from 'rxjs';

type ID = { id: string };

export const useUserOrgDetails = (viewAll?: boolean) => {
	const { data: user } = useCurrentUser();

	const serviceProvider = useFramework().modules.serviceDiscovery;

	const projects = useMemo(() => {
		return user?.positions
			?.filter((item) => viewAll || (item.appliesTo && new Date(item.appliesTo) > new Date()))
			.map((position) => position.project.id);
	}, [user, viewAll]);

	return useQuery<RelationReturnType<'ProjectMaster'>[], Error>({
		queryKey: ['pro-to-proM ', JSON.stringify(projects?.join), viewAll],
		queryFn: async () => {
			const contextClient = await serviceProvider.createClient('context');

			const gg = contextClient
				.json$<ID[]>(
					`contexts/?$filter=type eq orgchart and (${projects
						?.map((id) => `externalID eq ${id}`)
						.join(' or ')})`
				)
				.pipe(
					switchMap((items) =>
						from(items).pipe(
							mergeMap((item) =>
								contextClient
									.json$<Relations[]>(`contexts/${item.id}/relations`)
									.pipe(
										map((x) =>
											x.filter((p): p is RelationReturnType<'ProjectMaster'> =>
												p.relationSource.includes('ProjectMaster')
											)
										)
									)
							),
							reduce(
								(acc, items) => [...acc, ...items].sort((i, o) => (i.title < o.title ? -1 : 1)),
								[] as RelationReturnType<'ProjectMaster'>[]
							)
						)
					)
				);
			return lastValueFrom(gg);
		},
		enabled: Boolean(projects && projects?.length > 0),
		_defaulted: undefined,
	});
};
