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

export type Variant = "Warning" | "Error" | "Info" | "NoContent";

export type Message = {
  type?: Variant;
  title: string;
  messages?: string[];
};

export type FormattedError = {
  status: number;
} & Message;
