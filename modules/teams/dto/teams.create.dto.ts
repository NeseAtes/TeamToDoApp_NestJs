import { Transform } from 'class-transformer';
import { IsString, Length, Matches, IsUUID, IsBoolean, IsOptional} from 'class-validator';

export class TeamsCreateDto {


  @IsString()
  @Length(1, 256)
  @Matches(/[^\s]/)
  teamName: string;

  @IsOptional()
  @IsUUID(4)
  captainId?: string;


  @IsUUID(4)
  member_id: string;


}
