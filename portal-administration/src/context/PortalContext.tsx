import {
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
  useState,
} from "react";

export type PortalContextState = {
  activePortalId: string | undefined;
};

export type PortalContext = {
  setActivePortalById: (id?: string) => void;
} & PortalContextState;

const Context = createContext<PortalContext>({
  activePortalId: undefined,
} as PortalContext);

export const PortalContextComponent = ({ children }: PropsWithChildren) => {
  const [activePortalId, setActivePortalId] = useState<string | undefined>();

  const setActivePortalById = (id?: string) => {
    setActivePortalId(id);
  };

  return (
    <Context.Provider value={{ activePortalId, setActivePortalById }}>
      {children}
    </Context.Provider>
  );
};

export const usePortalContext = () => {
  return useContext(Context);
};
