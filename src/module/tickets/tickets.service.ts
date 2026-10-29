import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { and, arrayContains, eq, ilike, or } from 'drizzle-orm';
import { DRIZZLE, type Db } from '../../db/db.module.js';
import { ticketsTable, type TicketRow } from '../../db/schema.js';
import type {
  CreateTicketDto,
  FindTicketsQuery,
  UpdateTicketDto,
} from './dto/ticket.dto.js';
import type { Ticktes } from './ticket/ticket.interface.js';

// DB row (Date object) -> API shape (ISO string) convert.
// Karon Ticktes interface e createdAt: string, kintu Postgres theke Date ase.
function toApi(row: TicketRow): Ticktes {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? '',
    completed: row.completed,
    priority: row.priority,
    dueDate: row.dueDate,
    tags: row.tags ?? [],
    createdAt:
      row.createdAt instanceof Date
        ? row.createdAt.toISOString()
        : String(row.createdAt),
  };
}

@Injectable()
export class TicketsService {
  // DRIZZLE token diye DbModule theke Postgres connection inject nilam.
  constructor(@Inject(DRIZZLE) private readonly db: Db) {}

  // GET /tickets?completed=&priority=&search=&tag=
  // Sob filter AND hoye kaj kore. Kono query na dile sob row ase.
  async findAll(query: FindTicketsQuery = {}): Promise<Ticktes[]> {
    const { completed, priority, search, tag } = query;

    // Vul priority agei 400 maro, DB te pathanor dorkar nai.
    if (priority && !['low', 'medium', 'high'].includes(priority)) {
      throw new BadRequestException(
        `Invalid priority '${priority}'. Use low | medium | high`,
      );
    }

    // WHERE condition gula ekhane jomai. Khali thakle WHERE charai SELECT.
    const conditions = [];
    if (completed !== undefined) {
      conditions.push(eq(ticketsTable.completed, completed));
    }
    if (priority) {
      conditions.push(eq(ticketsTable.priority, priority));
    }
    if (tag) {
      // tags text[] column — [tag] array er ekta o millei row asbe.
      conditions.push(arrayContains(ticketsTable.tags, [tag]));
    }
    if (search) {
      // ILIKE = case-insensitive LIKE. %search% mane vitore thaklei match.
      const pattern = `%${search}%`;
      conditions.push(
        or(
          ilike(ticketsTable.title, pattern),
          ilike(ticketsTable.description, pattern),
        ),
      );
    }

    const rows =
      conditions.length > 0
        ? await this.db
            .select()
            .from(ticketsTable)
            .where(and(...conditions))
        : await this.db.select().from(ticketsTable);

    return rows.map(toApi);
  }

  // GET /tickets/:id — na paile 404
  async findOne(id: number): Promise<Ticktes> {
    const rows = await this.db
      .select()
      .from(ticketsTable)
      .where(eq(ticketsTable.id, id));
    if (rows.length === 0) {
      throw new NotFoundException(`Ticket #${id} not found`);
    }
    return toApi(rows[0]);
  }

  // POST /tickets — .returning() dile insert howa row tai back pabo.
  async create(dto: CreateTicketDto): Promise<Ticktes> {
    const rows = await this.db
      .insert(ticketsTable)
      .values({
        title: dto.title,
        description: dto.description,
        completed: dto.completed,
        priority: dto.priority,
        dueDate: dto.dueDate,
        tags: dto.tags,
      })
      .returning();
    return toApi(rows[0]);
  }

  // PUT /tickets/:id — full replace. Sob field lagbe (CreateTicketDto).
  async replace(id: number, dto: CreateTicketDto): Promise<Ticktes> {
    const rows = await this.db
      .update(ticketsTable)
      .set({
        title: dto.title,
        description: dto.description,
        completed: dto.completed,
        priority: dto.priority,
        dueDate: dto.dueDate,
        tags: dto.tags,
      })
      .where(eq(ticketsTable.id, id))
      .returning();
    if (rows.length === 0) {
      throw new NotFoundException(`Ticket #${id} not found`);
    }
    return toApi(rows[0]);
  }

  // PATCH /tickets/:id — partial update. Ja pathabe sudhu setai change hobe.
  async update(id: number, dto: UpdateTicketDto): Promise<Ticktes> {
    // Khali {} ba body na asle DB hit na kore ager data ferot.
    // Age ekhane Object.keys(dto) direct chilo, dto undefined asle crash korto.
    if (!dto || Object.keys(dto).length === 0) {
      return this.findOne(id);
    }
    const rows = await this.db
      .update(ticketsTable)
      .set(dto)
      .where(eq(ticketsTable.id, id))
      .returning();
    if (rows.length === 0) {
      throw new NotFoundException(`Ticket #${id} not found`);
    }
    return toApi(rows[0]);
  }

  // DELETE /tickets/:id — delete kore deleted row ferot dey.
  async remove(id: number): Promise<Ticktes> {
    const rows = await this.db
      .delete(ticketsTable)
      .where(eq(ticketsTable.id, id))
      .returning();
    if (rows.length === 0) {
      throw new NotFoundException(`Ticket #${id} not found`);
    }
    return toApi(rows[0]);
  }
}
