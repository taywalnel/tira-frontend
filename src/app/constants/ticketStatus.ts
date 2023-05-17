type TicketStatusOptions = {
  [key: string]: string;
};

export const TICKET_STATUS_CODES = {
  TO_DO: 'toDo',
  IN_PROGRESS: 'inProgress',
  ABANDONED: 'abandoned',
  DONE: 'done'
};

export const TICKET_STATUS_LABELS: TicketStatusOptions = {
  toDo: 'To do',
  inProgress: 'In progress',
  abandoned: 'Abandoned',
  done: 'Done'
};
