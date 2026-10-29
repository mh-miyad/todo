import { Ticktes } from '../module/tickets/ticket/ticket.interface.js';

export const tickets: Ticktes[] = [
  {
    id: 1,
    title: 'NestJS basics shikho',
    description:
      'NestJS module, controller, service kivabe kaj kore seta docs pore + choto example baniye practice koro.',
    completed: true,
    priority: 'high',
    dueDate: '2026-11-02',
    tags: ['learning', 'nestjs'],
    createdAt: '2026-10-20T10:00:00Z',
  },
  {
    id: 2,
    title: 'Todo CRUD API banao',
    description:
      'GET, POST, PATCH, DELETE endpoint banau tickets controller er moto kore, Postman diye test koro.',
    completed: false,
    priority: 'high',
    dueDate: '2026-11-05',
    tags: ['backend', 'api'],
    createdAt: '2026-10-21T09:30:00Z',
  },
  {
    id: 3,
    title: 'ValidationPipe + DTO add koro',
    description:
      'class-validator diye CreateTodoDto, UpdateTodoDto banau jate title empty na jay, priority enum check hoy.',
    completed: false,
    priority: 'medium',
    dueDate: '2026-11-06',
    tags: ['validation', 'dto'],
    createdAt: '2026-10-22T11:00:00Z',
  },
  {
    id: 4,
    title: 'In-memory service ke data.ts theke load koro',
    description:
      'Hardcoded array service theke soriye src/data/data.ts theke import kore use koro, findById e 404 throw koro.',
    completed: false,
    priority: 'medium',
    dueDate: '2026-11-07',
    tags: ['refactor', 'service'],
    createdAt: '2026-10-23T08:45:00Z',
  },
  {
    id: 5,
    title: 'Swagger example response likho',
    description:
      'DocumentBuilder e ApiProperty / ApiResponse add kore swagger UI sundor koro, title, description visible rakho.',
    completed: false,
    priority: 'low',
    dueDate: '2026-11-08',
    tags: ['swagger', 'docs'],
    createdAt: '2026-10-24T12:15:00Z',
  },
  {
    id: 6,
    title: 'Filter + search query banao',
    description:
      'GET /todos?completed=true&priority=high&search=nest ei rokom query diye filter korar logic likho.',
    completed: false,
    priority: 'medium',
    dueDate: '2026-11-10',
    tags: ['feature', 'filter'],
    createdAt: '2026-10-25T10:20:00Z',
  },
  {
    id: 7,
    title: 'Unit test likho service er jonno',
    description:
      'Vitest diye TicketsService / TodosService er findAll, findById, create, delete er test case likho.',
    completed: false,
    priority: 'low',
    dueDate: '2026-11-12',
    tags: ['testing', 'vitest'],
    createdAt: '2026-10-26T09:00:00Z',
  },
  {
    id: 8,
    title: 'E2E test fix koro',
    description:
      'test/app.e2e-spec.ts e Hello World test ta remove kore real /api/tickets endpoint test koro.',
    completed: false,
    priority: 'low',
    dueDate: '2026-11-13',
    tags: ['testing', 'e2e'],
    createdAt: '2026-10-27T14:00:00Z',
  },
  {
    id: 9,
    title: 'Git commit + clean code practice',
    description:
      'Prettier + oxlint run kore formatting fix koro, meaningful commit message diye push koro.',
    completed: false,
    priority: 'medium',
    dueDate: '2026-11-14',
    tags: ['git', 'clean-code'],
    createdAt: '2026-10-28T16:30:00Z',
  },
  {
    id: 10,
    title: 'Frontend theke API connect koro',
    description:
      'Simple HTML / React page theke fetch kore todo list show koro, completed toggle button add koro.',
    completed: false,
    priority: 'high',
    dueDate: '2026-11-15',
    tags: ['frontend', 'integration'],
    createdAt: '2026-10-29T09:00:00Z',
  },
];
