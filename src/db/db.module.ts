import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema.js';

// Controller/Service e @Inject('DRIZZLE') diye DB pabo.
export const DRIZZLE = 'DRIZZLE';
export type Db = NodePgDatabase<typeof schema>;

@Global() // ekbar import korlei sob module e DB available
@Module({
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: (config: ConfigService): Db => {
        // Pool = Postgres connection pool. Sob query ei pool diye jabe.
        const pool = new Pool({
          connectionString: config.getOrThrow<string>('DATABASE_URL'),
        });
        return drizzle(pool, { schema });
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DbModule {}
