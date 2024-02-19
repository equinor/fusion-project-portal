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
			filter(actions.fetchPortal.match),
			switchMap((action) => {
				const {
					payload: { portalId },
					meta: { update },
				} = action;

				const subject = from(provider.getPortalById$(portalId)).pipe(
					filter((x) => !!x),
					share()
				);
				return concat(
					subject.pipe(
						map((portal) => {
							console.log(portal);
							return actions.setPortal(portal, update);
						})
					),
					subject.pipe(
						last(),
						map((portal) => actions.fetchPortal.success(portal))
					)
				).pipe(
					catchError((err) => {
						console.log(err, action.payload);
						return of(actions.fetchPortal.failure(err));
					})
				);
			})
		);
