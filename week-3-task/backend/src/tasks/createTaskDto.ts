import { Optional } from '@nestjs/common';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  task: string;

  @IsString()
  @Optional()
  description: string;
}
