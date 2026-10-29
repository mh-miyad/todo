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
import { ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import {
  createTicketSchema,
  updateTicketSchema,
  type FindTicketsQuery,
} from './dto/ticket.dto.js';
import { ZodValidationPipe } from './pipes/zod-validation.pipe.js';

const ticketExample = {
  title: 'Todo CRUD API banao',
  description: 'GET, POST, PATCH, DELETE endpoint banau',
  completed: false,
  priority: 'high',
  dueDate: '2026-11-05',
  tags: ['backend', 'api'],
};

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  // GET /api/tickets?completed=true&priority=high&search=nest&tag=api
  // @ApiQuery required:false dile Swagger UI te optional dekhay,
  // nahole Swagger sob query ke required vabe block kore.
  @Get()
  @ApiQuery({ name: 'completed', required: false, type: Boolean })
  @ApiQuery({
    name: 'priority',
    required: false,
    enum: ['low', 'medium', 'high'],
  })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'tag', required: false, type: String })
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
  @ApiParam({ name: 'id', type: Number, example: 1 })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ticketsService.findOne(id);
  }

  // POST /api/tickets
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ schema: { type: 'object', example: ticketExample } })
  create(@Body(new ZodValidationPipe(createTicketSchema)) dto: any) {
    return this.ticketsService.create(dto);
  }

  // PUT /api/tickets/:id — full replace, sob field lagbe.
  // Age @Body type-only chilo tai Swagger body box dekhato na,
  // khali id diye Execute hoye service e dto undefined giye crash korto.
  @Put(':id')
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiBody({ schema: { type: 'object', example: ticketExample } })
  replace(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(createTicketSchema)) dto: any,
  ) {
    return this.ticketsService.replace(id, dto);
  }

  // PATCH /api/tickets/:id — partial update.
  @Patch(':id')
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiBody({ schema: { type: 'object', example: { completed: true } } })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateTicketSchema)) dto: any,
  ) {
    return this.ticketsService.update(id, dto);
  }

  // DELETE /api/tickets/:id
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: Number, example: 1 })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ticketsService.remove(id);
  }
}
