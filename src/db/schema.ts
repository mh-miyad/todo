import {
  boolean,
  date,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

// Postgres ENUM — priority sudhu ei 3 ta value nite parbe.
// DB level e vul value dhuktei parbe na. Interface er union type er sathe mile.
export const ticketPriority = pgEnum('ticket_priority', [
  'low',
  'medium',
  'high',
]);

// tickets table — amader Ticktes interface er DB version.
// id serial = auto increment primary key.
export const ticketsTable = pgTable('tickets', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull().default(''),
  completed: boolean('completed').notNull().default(false),
  priority: ticketPriority('priority').notNull().default('medium'),
  // dueDate 'YYYY-MM-DD' string hisebe rakhlam, data.ts er sathe mil rakhte.
  dueDate: date('due_date').notNull(),
  // tags Postgres text[] array column.
  tags: text('tags').array().notNull().default([]),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// SELECT korle jeta pabo tar type
export type TicketRow = typeof ticketsTable.$inferSelect;
// INSERT korar somoy jeta pathabo (id/createdAt optional)
export type NewTicketRow = typeof ticketsTable.$inferInsert;
