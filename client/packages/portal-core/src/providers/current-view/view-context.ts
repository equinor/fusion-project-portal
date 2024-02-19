import { createContext } from 'react';
import { Observable } from 'rxjs';
import { Portal } from '@portal/types';

type ViewController = {
	setViewId: (viewId: string | undefined) => void;
	getId: () => string | undefined;
	currentViewKey$: Observable<string | undefined>;
	currentView: Portal | undefined;
	views: Portal[];
	isLoading: boolean;
};

export const ViewControllerContext = createContext<ViewController>({} as ViewController);
