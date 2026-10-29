import { Injectable } from '@nestjs/common';
import { Ticket } from './ticket.interface.js';

@Injectable()
export class TicketsService {
  private readonly tickets: Ticket[] = [
    { id: 1, name: 'miyad' },
    { id: 2, name: 'mahi' },
  ];

  findAll() {
    return this.tickets;
  }
}
