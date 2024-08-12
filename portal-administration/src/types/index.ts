export type Portal = {
  name: string;
  shortName: string;
  subtext: string;
  id: string;
  key: string;
  type: string;
  icon: string;
  isDefault: boolean;
  description: string;
  contexts: PortalContext[];
};

export type PortalAppCreate = {
  appKey: string;
  removeAppFromContexts: boolean;
};

export type PortalContext = {
  type: string;
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
