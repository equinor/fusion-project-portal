export type View = {
  id: string;
  icon?: string;
  name: string;
  shortName: string;
  subtext: string;
  order: number;
  appGroups: AppGroup[];
  key: string;
  isDefault: boolean;
};

export interface App {
  appKey: string;
  name: string;
  description: string;
  order: number;
  appGroup?: string;
}

export interface AppGroup {
  name: string;
  accentColor: string;
  order: number;
  apps: App[];
}
