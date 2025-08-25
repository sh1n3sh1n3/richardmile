// ----------------------------------------------------------------------

export interface ICalendarEvent {
  id: string;
  title: string;
  description?: string;
  allDay?: boolean;
  start: Date | string | number | null;
  end: Date | string | number | null;
  color?: string;
  textColor?: string;
  display?: string;
}

export interface ICalendarState {
  isLoading: boolean;
  error: any;
  events: ICalendarEvent[];
}
