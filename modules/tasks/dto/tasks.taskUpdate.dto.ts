import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsUUID, Length } from 'class-validator';

export class TasksUpdateDto {
  @IsOptional()
  @IsUUID(4)
  @ApiPropertyOptional()
  id?: string;


  @IsEmail()
  @Length(1, 256)
  @ApiProperty()
  task: string;


}
