// ----------------------------------------------------------------------

export interface IMailLabel {
  id: string;
  name: string;
  type: 'system' | 'custom';
  color?: string;
  unreadCount?: number;
}

export interface IMail {
  id: string;
  labelIds: string[];
  folder: string;
  isImportant: boolean;
  isStarred: boolean;
  isUnread: boolean;
  subject: string;
  message: string;
  createdAt: Date | string;
  attachments: string[];
  from: {
    name: string;
    email: string;
    avatar: string;
  };
  to: Array<{
    name: string;
    email: string;
    avatar: string;
  }>;
}

export interface IMailState {
  isLoading: boolean;
  error: any;
  mails: {
    byId: Record<string, IMail>;
    allIds: string[];
  };
  labels: IMailLabel[];
}
