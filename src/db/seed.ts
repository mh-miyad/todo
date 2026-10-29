import 'dotenv/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { ticketsTable } from './schema.js';
import { tickets as seedTickets } from '../data/data.js';

// Seed script — src/data/data.ts er 10 ta todo DB te dhukay.
// Chalao: bun run db:seed
// Age `bun run db:push` diye table baniye nio.
async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL missing. .env file check koro.');
  }
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool);

  // Purana data clean kore fresh seed — practice project er jonno easy.
  await db.delete(ticketsTable);

  await db.insert(ticketsTable).values(
    seedTickets.map((t) => ({
      title: t.title,
      description: t.description,
      completed: t.completed,
      priority: t.priority,
      dueDate: t.dueDate,
      tags: t.tags,
    })),
  );

  console.log(`Seeded ${seedTickets.length} tickets`);
  await pool.end();
}

await main();
