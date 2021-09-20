import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional, IsUUID, Length } from 'class-validator';
import { Transform } from 'class-transformer';


export class CheckUpdateDto  {
  @IsOptional()
  @IsUUID(4)
  @ApiPropertyOptional()
  id?: string;


  @IsOptional()
  @Transform((value: string) => value === 'false')
  @IsBoolean()
  checked?: boolean;


}
