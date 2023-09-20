export type CurrentUser = {
  avatarUrl: any;
  key: number;
  disabled?: boolean;
  href: string;
  avatar: string;
  name: string;
  owner: string;
  desc: string;
  callNo: number;
  status: string;
  updatedAt: Date;
  createdAt: Date;
  progress: number;
};

export type UsersPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type UsersData = {
  list: UsersItem[];
  pagination: Partial<UsersPagination>;
};

export type UsersParams = {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};
