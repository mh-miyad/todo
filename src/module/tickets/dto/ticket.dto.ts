import { z } from 'zod';
import type { Ticktes } from '../ticket/ticket.interface.js';

// Zod schema — runtime validation. TypeScript type sudhu compile time e thake,
// kintu API te vul/empty body asle crash hoy. Zod agei 400 diye atke dey.
export const createTicketSchema = z.object({
  title: z.string().min(1, 'title khali hote parbe na'),
  description: z.string().min(1, 'description khali hote parbe na'),
  completed: z.boolean(),
  priority: z.enum(['low', 'medium', 'high']),
  dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'dueDate YYYY-MM-DD hote hobe'),
  tags: z.array(z.string()).default([]),
});

// PATCH er jonno sob field optional — ja pathabe sudhu setai update hobe.
export const updateTicketSchema = createTicketSchema.partial();

export type CreateTicketDto = Omit<Ticktes, 'id' | 'createdAt'>;

export type UpdateTicketDto = Partial<CreateTicketDto>;

export interface FindTicketsQuery {
  completed?: boolean;
  priority?: 'low' | 'medium' | 'high';
  search?: string;
  tag?: string;
}
