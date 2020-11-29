export interface Event{
  id?: number;
  eventName: string;
  description: string;
  eventStart: string;
  street: string;
  city: string;
  zipcode: string;
  organizerName?: string;
}
