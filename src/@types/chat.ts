// ----------------------------------------------------------------------

export interface IChatContact {
  id: string;
  name: string;
  username: string;
  avatar: string;
  address: string;
  phone: string;
  email: string;
  lastActivity: Date | string;
  status: 'online' | 'offline' | 'away';
  role: string;
}

export interface IChatMessage {
  id: string;
  body: string;
  contentType: 'text' | 'image' | 'file';
  attachments: string[];
  createdAt: Date | string;
  senderId: string;
}

export interface IChatConversation {
  id: string;
  participants: string[];
  type: 'ONE_TO_ONE' | 'GROUP';
  unreadCount: number;
  messages: IChatMessage[];
  lastMessage?: IChatMessage;
}

export interface IChatState {
  isLoading: boolean;
  error: any;
  contacts: {
    byId: Record<string, IChatContact>;
    allIds: string[];
  };
  conversations: {
    byId: Record<string, IChatConversation>;
    allIds: string[];
  };
  activeConversationId: string | null;
  participants: IChatContact[];
  recipients: IChatContact[];
}
