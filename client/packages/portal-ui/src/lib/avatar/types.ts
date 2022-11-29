export interface PresenceInfo {
  status: string;
  icon: JSX.Element;
}

export interface Presence {
  activity: Activity;
  availability: Availability;
  id: string;
}

export type Availability =
  | 'Busy'
  | 'Available'
  | 'Offline'
  | 'Away'
  | 'BeRightBack'
  | 'DoNotDisturb';
export type Activity =
  | 'Busy'
  | 'Available'
  | 'OffWork'
  | 'Offline'
  | 'Away'
  | 'BeRightBack';
