import { createContext } from "react";
import { Observable } from "rxjs";
import { View } from "../../types";

type ViewController = {
    setViewId: (viewId: string | undefined) => void;
    getId: () => string | undefined;
    currentViewKey$: Observable<string | undefined>;
    currentView: View | undefined;
    views: View[];
    isLoading: boolean;
};

export const ViewControllerContext = createContext<ViewController>({} as ViewController);