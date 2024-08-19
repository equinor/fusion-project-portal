import {
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
  useState,
} from "react";
import { useGetPortal } from "../hooks/use-portal-query";
import { Portal } from "../types";

export type PortalContextState = {
  activePortalId: string | undefined;
} & Partial<Portal>;

export type PortalContext = {
  setActivePortalById: (id?: string) => void;
} & PortalContextState;

const Context = createContext<PortalContext>({
  activePortalId: undefined,
} as PortalContext);

export const PortalContextComponent = ({ children }: PropsWithChildren) => {
  const [activePortalId, setActivePortalId] = useState<string | undefined>();

  const { data } = useGetPortal(activePortalId);

  const setActivePortalById = (id?: string) => {
    setActivePortalId(id);
  };

  return (
    <Context.Provider value={{ ...data, activePortalId, setActivePortalById }}>
      {children}
    </Context.Provider>
  );
};

export const usePortalContext = () => {
  return useContext(Context);
};
