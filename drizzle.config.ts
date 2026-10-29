import { defineConfig } from 'drizzle-kit';

// drizzle-kit er config — migration generate / push korar somoy
// kon schema file theke kon database e jabe seta bole dey.
// DATABASE_URL .env theke ase. Example: postgres://postgres:postgres@localhost:5432/todo
export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
