import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TicketsService } from './tickets.service.js';
import type {
  CreateTicketDto,
  FindTicketsQuery,
  UpdateTicketDto,
} from './dto/ticket.dto.js';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  // GET /api/tickets?completed=true&priority=high&search=nest&tag=api
  @Get()
  findAll(
    @Query('completed', new ParseBoolPipe({ optional: true }))
    completed?: boolean,
    @Query('priority') priority?: FindTicketsQuery['priority'],
    @Query('search') search?: string,
    @Query('tag') tag?: string,
  ) {
    return this.ticketsService.findAll({
      completed,
      priority,
      search,
      tag,
    });
  }

  // GET /api/tickets/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ticketsService.findOne(id);
  }

  // POST /api/tickets
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateTicketDto) {
    return this.ticketsService.create(dto);
  }

  // PUT /api/tickets/:id — full replace
  @Put(':id')
  replace(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateTicketDto,
  ) {
    return this.ticketsService.replace(id, dto);
  }

  // PATCH /api/tickets/:id — partial update
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTicketDto,
  ) {
    return this.ticketsService.update(id, dto);
  }

  // DELETE /api/tickets/:id
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ticketsService.remove(id);
  }
}
