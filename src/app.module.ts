import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { createObserveModule } from '@nestjs/observe';
import { TicketsModule } from './module/tickets/tickets.module.js';
import { DbModule } from './db/db.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // .env file load kore process.env e dey. isGlobal:true tai
    // jekono service e ConfigService inject kora jay.
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule, // Postgres + Drizzle connection (Global)
    TicketsModule,
  ],
})
export class AppModule {}
