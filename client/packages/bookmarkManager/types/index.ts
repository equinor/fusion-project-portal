export interface CreatedBy {
  azureUniqueId: string;
  mail: string;
  name: string;
  phoneNumber: string;
  jobTitle: string;
  accountType: string;
  accountClassification: string;
}

export interface SourceSystem {
  identifier: string;
  name: string;
  subSystem: string;
}

export type Bookmark = {
  id: string;
  name: string;
  isShared: boolean;
  appKey: string;
  createdBy: CreatedBy;
  created: Date;
  sourceSystem: SourceSystem;
} & {
  isMine: boolean;
};
