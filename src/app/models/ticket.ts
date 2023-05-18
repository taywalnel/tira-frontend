export interface Ticket {
  title: string;
  description: string;
  dateCreated: string;
  dateDue: string;
  status: string;
  priority: string;
  size: string;
  displayId?: string;
  _id?: string;
}
