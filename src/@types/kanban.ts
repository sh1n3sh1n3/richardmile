// ----------------------------------------------------------------------

export interface IKanbanCard {
  id: string;
  name: string;
  description?: string;
  assignee?: string[];
  due?: Date | string;
  attachments: string[];
  comments: any[];
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  labels: string[];
}

export interface IKanbanColumn {
  id: string;
  name: string;
  cardIds: string[];
}

export interface IKanbanBoard {
  cards: Record<string, IKanbanCard>;
  columns: Record<string, IKanbanColumn>;
  columnOrder: string[];
}

export interface IKanbanState {
  isLoading: boolean;
  error: any;
  board: IKanbanBoard;
}
