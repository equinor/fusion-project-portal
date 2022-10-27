type AppCategory = {
  id?: string;
  name: string | null;
  color: string | null;
  defaultIcon: string | null;
};

export type ModuleManifest = {
  key: string;
  name: string;
  shortName: string;
  version: string;
  description: string;
  category: AppCategory | null;
};
