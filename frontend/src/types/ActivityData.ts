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

export interface ActivityResponse {
  id: string;
  title: string;
  description: string;
  type: string;
  image: string;
  confirmationCode: string;
  participantCount: number;
  address: ActivityAddress;
  scheduleDate: string;
  createdAt: string;
  completedAt: string;
  private: boolean;
  creator: ActivityCreator;
  isSelf: boolean;
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
  id?: string;
  name: string;
  description: string;
  image: string;
}
export interface Participant {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  subscriptionStatus: string;
  confirmedAt: string;
}
