import { IsUUID } from 'class-validator';

export class TeamOfUserCreateDto {

  
  @IsUUID(4)
  team_id: string;

  @IsUUID(4)
  member_id: string;
}
