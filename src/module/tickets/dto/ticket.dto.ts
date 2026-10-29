import type { Ticktes } from '../ticket/ticket.interface.js';

export type CreateTicketDto = Omit<Ticktes, 'id' | 'createdAt'>;

export type UpdateTicketDto = Partial<CreateTicketDto>;

export interface FindTicketsQuery {
  completed?: boolean;
  priority?: 'low' | 'medium' | 'high';
  search?: string;
  tag?: string;
}
