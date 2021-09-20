import { Transform } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsUUID,
  Length,
  Matches,
  Min,
} from 'class-validator';



export class TasksLookupDto {
  @IsOptional()
  @Transform((value: string) => value.split(',').map(item => item.trim()))
  @ArrayUnique()
  @ArrayMinSize(1)
  @ArrayMaxSize(32)
  @IsUUID(4, { each: true })
  id?: string[];


  @IsOptional()
  @Transform((value: string) => value.split(',').map(item => item.trim()))
  @ArrayUnique()
  @ArrayMinSize(1)
  @ArrayMaxSize(32)
  @Length(1, 256, { each: true })
  @Matches(/[^\s]/, { each: true })
  task?: string[];


  /*@IsOptional()
  @Transform((value: string) => value.split(',').map(item => item.trim()))
  @ArrayUnique()
  @ArrayMinSize(1)
  @ArrayMaxSize(32)
  @IsUUID(4, { each: true })
  team_id?: string[];


  @IsOptional()
  @Transform((value: string) => value.split(',').map(item => item.trim()))
  @ArrayUnique()
  @ArrayMinSize(1)
  @ArrayMaxSize(32)
  @IsUUID(4, { each: true })
  uye_id?: string[];*/


  @IsOptional()
  @Transform((value: string) => value.split(',').map(item => item.trim()))
  @ArrayUnique()
  @ArrayMinSize(1)
  @ArrayMaxSize(32)
  @IsUUID(4, { each: true })
  teamofuserid?: string[];

  @IsOptional()
  @Transform((value: string) => value === 'false')
  @IsBoolean()
  checked?: boolean;
 
}
