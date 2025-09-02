export interface ActivityTypeNew {
  id?: string;
  title: string;
  description: string;
  typeId: string;
  address: Array<string>;
  imageFile: File;
  scheduledDate: string;
  private: boolean;
}

export interface ActivityTypeEdit {
  id?: string;
  title: string;
  description: string;
  typeId: string;
  address: Array<string>;
  imageFile?: File;
  scheduledDate: string;
  private: boolean;
}

export type ActivityTypeUpdate = Partial<ActivityType>;

export interface ActivityAddress {
  latitude: number;
  longitude: number;
}

export interface ActivityCreator {
  id: string;
  name: string;
  avatar: string;
}

export interface ActivityType {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface ActivityResponse {
  id: string;
  title: string;
  description: string;
  type: string | ActivityType;
  image: string;
  confirmationCode?: string;
  participantCount: number;
  address: ActivityAddress;
  scheduleDate: string;
  createdAt: string;
  deletedAt: string | null;
  completedAt: string | null;
  private: boolean;
  creator: ActivityCreator;
  isSelf?: boolean;
  userSubscriptionStatus?: string;
}

export interface ActivitiesPaginatedResponse {
  page: number;
  pageSize: number;
  totalActivities: number;
  totalPages: number;
  previous: number;
  next: number;
  activities: ActivityResponse[];
}

export interface ActivityType {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface UserPreferencesType {
  typeId: string;
  typeName: string;
  typeDescription: string;
}
export interface Participant {
  id?: string;
  activityId?: string;
  userId?: string;
  approved?: boolean;
  approvedAt?: string | null;
  confirmedAt?: string | null;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  subscriptionStatus?: string | null;
}

export interface HistoryActivity {
  id: string;
  activityId: string;
  userId: string;
  approved: boolean;
  approvedAt: string | null;
  confirmedAt: string | null;
  activity: ActivityResponse;
  participantCount: number;
}
export interface HistoryActivityRes {
  activities: HistoryActivity[];
}
export enum UserSubscriptionStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  NONE = 'none',
}
export interface ActivitySubResponse {
  id: string;
  subscriptionStatus: UserSubscriptionStatus;
  activityId: string;
  userId: string;
}
