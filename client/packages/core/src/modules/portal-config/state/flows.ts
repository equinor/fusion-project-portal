import { from, of, concat } from 'rxjs';
import { catchError, filter, last, map, share, switchMap } from 'rxjs/operators';

import { actions } from './actions';

import type { Flow } from '@equinor/fusion-observable';

import type { Actions } from './actions';
import { PortalState } from '../types';
import { PortalConfigProvider } from '../provider';

export const handleFetchPortal =
	(provider: PortalConfigProvider): Flow<Actions, PortalState> =>
	(action$) =>
		action$.pipe(
			filter(actions.fetchPortalConfig.match),
			switchMap((action) => {
				const {
					payload: { portalId },
					meta: { update },
				} = action;

				const subject = from(provider.getPortalConfig(portalId)).pipe(
					filter((x) => !!x),
					share()
				);
				return concat(
					subject.pipe(map((portal) => actions.setPortalConfig(portal, update))),
					subject.pipe(
						last(),
						map((portal) => actions.fetchPortalConfig.success(portal))
					)
				).pipe(
					catchError((err) => {
						console.log(err, action.payload);
						return of(actions.fetchPortalConfig.failure(err));
					})
				);
			})
		);

export const handleFetchAppsByContext =
	(provider: PortalConfigProvider): Flow<Actions, PortalState> =>
	(action$) =>
		action$.pipe(
			filter(actions.fetchAppKeysByContextId.match),
			switchMap((action) => {
				const {
					payload: { contextId },
					meta: { update },
				} = action;
				const subject = from(provider.getAppsByContext(contextId)).pipe(
					filter((x) => !!x),
					share()
				);
				return concat(
					subject.pipe(
						map((apps) => {
							return actions.setAppKeys(apps, update);
						})
					),
					subject.pipe(
						last(),
						map((apps) => actions.fetchAppKeysByContextId.success(apps))
					)
				).pipe(
					catchError((err) => {
						console.error(err, action.payload);
						return of(actions.fetchAppKeysByContextId.failure(err));
					})
				);
			})
		);
export const handleFetchApps =
	(provider: PortalConfigProvider): Flow<Actions, PortalState> =>
	(action$) =>
		action$.pipe(
			filter(actions.fetchAppKeys.match),
			switchMap((action) => {
				const {
					meta: { update },
				} = action;

				const subject = from(provider.getApps()).pipe(
					filter((x) => !!x),
					share()
				);
				return concat(
					subject.pipe(map((apps) => actions.setAppKeys(apps, update))),
					subject.pipe(
						last(),
						map((apps) => actions.fetchAppKeys.success(apps))
					)
				).pipe(
					catchError((err) => {
						console.error(err, action.payload);
						return of(actions.fetchAppKeys.failure(err));
					})
				);
			})
		);
