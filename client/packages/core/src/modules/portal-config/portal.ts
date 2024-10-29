import { BaseConfig, Extensions, PortalConfigState, PortalRouter, PortalState } from './types';
import { Observable, map, take } from 'rxjs';

import { FlowSubject } from '@equinor/fusion-observable';
import { Actions, actions } from './state/actions';
import { createState } from './state/create-state';
import { PortalConfigProvider } from './provider';
import { filterEmpty } from './utils';

export interface IPortal {
	state: PortalState;
	base: BaseConfig;
	state$: Observable<PortalState>;
	portalConfig$: Observable<PortalConfigState>;
	portalConfig: PortalConfigState;
	routes$: Observable<PortalRouter>;
	appsKeys$: Observable<string[]>;
	appKeys: string[];
	getAppKeysByContext(contextId: string): void;
	getAppKeys(): void;
}

export type CurrentPortal = IPortal;

export class Portal implements IPortal {
	#state: FlowSubject<PortalState, Actions>;

	base: BaseConfig;

	constructor(args: { provider: PortalConfigProvider; base: BaseConfig; initialPortalConfig?: PortalState }) {
		this.base = args.base;
		this.#state = createState(args.provider, args.initialPortalConfig);
		this.initialize();
	}

	protected async initialize(): Promise<void> {
		this.#state.next(actions.fetchPortalConfig(this.base));
	}

	getAppKeysByContext(contextId: string): void {
		this.#state.next(actions.fetchAppKeysByContextId({ contextId }, true));
	}

	getAppKeys(): void {
		this.#state.next(actions.fetchAppKeys());
	}

	get routes$(): Observable<PortalRouter> {
		return this.#state.pipe(
			map(({ routes }) => routes),
			filterEmpty(),
			take(1)
		);
	}

	get appsKeys$(): Observable<string[]> {
		return this.#state.pipe(
			map(({ apps }) => apps),
			filterEmpty()
		);
	}

	get appKeys(): string[] {
		return this.#state.value.apps || [];
	}

	get extensions$(): Observable<Extensions> {
		return this.#state.pipe(
			map(({ extensions }) => extensions),
			filterEmpty()
		);
	}

	get portalConfig$(): Observable<PortalConfigState> {
		return this.#state.pipe(
			map(({ portal }) => portal),
			filterEmpty(),
			take(1)
		);
	}

	get portalConfig(): PortalConfigState {
		return this.#state.value.portal;
	}

	get state(): PortalState {
		return this.#state.value;
	}

	get state$(): Observable<PortalState> {
		return this.#state.pipe(
			map((state) => state),
			filterEmpty()
		);
	}

	[Symbol.dispose]() {
		this.complete();
	}

	public complete() {
		this.#state.complete();
	}
}
