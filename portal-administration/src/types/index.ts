import { AppManifest } from "@equinor/fusion-framework-react-app";

export type Portal = {
  name: string;
  shortName: string;
  subtext: string;
  id: string;
  key: string;
  type: string;
  icon: string;
  description: string;
  contexts: ContextType[];
};

export type CreatePortal = Omit<Portal, "id">;

export type PortalAppCreate = {
  appKey: string;
  removeAppFromContexts: boolean;
};

export type ContextType = {
  type: string;
};
export type OnboardedContext = {
  title: string;
  id: string;
  contextId: string;
  externalId: string;
  type: string;
  description: string;
};

export type Variant = "Warning" | "Error" | "Info" | "NoContent";

export type Message = {
  type?: Variant;
  title: string;
  messages?: string[];
};

export type FormattedError = {
  status: number;
} & Message;

export type PortalApp = {
  name: string;
  id: string;
  appKey: string;
  isLegacy: boolean;
  description: string;
  contexts: ContextType[];
  appInformation: { icon: string };
  isActive?: boolean;
};
export type PortalAppMutation = {
  contextTypes: string[];
};

export type AppManifestResponse = {
  key: string;
  contextTypes: ContextType[];
  appManifest: AppManifest;
};
