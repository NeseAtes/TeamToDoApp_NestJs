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



export class TeamsLookupDto {
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
  teamName?: string[];


  @IsOptional()
  @Transform((value: string) => value.split(',').map(item => item.trim()))
  @ArrayUnique()
  @ArrayMinSize(1)
  @ArrayMaxSize(32)
  @IsUUID(4, { each: true })
  captainId?: string[];


  @IsOptional()
  @Transform((value: string) => value.split(',').map(item => item.trim()))
  @ArrayUnique()
  @ArrayMinSize(1)
  @ArrayMaxSize(32)
  @IsUUID(4, { each: true })
  member_id?: string[];


 
}
