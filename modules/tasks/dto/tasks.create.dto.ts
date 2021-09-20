import { Transform } from 'class-transformer';
import { IsString, Length, Matches, IsUUID, IsBoolean, IsOptional} from 'class-validator';

export class TasksCreateDto {
  @IsString()
  @Length(1, 256)
  @Matches(/[^\s]/)
  task: string;

  /*@IsUUID(4)
  team_id: string;

  @IsUUID(4, { each: true })
  uye_id: string;*/

  @IsUUID(4)
  teamofuserid: string;

  @IsOptional()
  @Transform((value: string) => value === 'false')
  @IsBoolean()
  checked?: boolean;
}
