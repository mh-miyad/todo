import { BadRequestException, type PipeTransform } from '@nestjs/common';
import type { ZodType } from 'zod';

// Generic Zod pipe — jekono schema diye @Body() validate kora jay.
// Vul body asle 400, service porjonto jay na (500 crash atkano jay).
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodType) {}

  transform(value: unknown) {
    // Swagger theke body na pathale value undefined/{} ase.
    const parsed = this.schema.safeParse(value ?? {});
    if (!parsed.success) {
      const msg = parsed.error.issues
        .map((i) => `${i.path.join('.') || 'body'}: ${i.message}`)
        .join(', ');
      throw new BadRequestException(msg);
    }
    return parsed.data;
  }
}
