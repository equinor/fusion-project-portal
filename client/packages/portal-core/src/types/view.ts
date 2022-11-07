export type View = {
  id: string;
  icon?: string;
  name: string;
  shortName: string;
  subtext: string;
  order: number;
  appGroups: AppGroup[];
};

export interface Application {
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
  applications: Application[];
}
