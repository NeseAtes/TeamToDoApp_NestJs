import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class UsersLoginDto {
  @IsEmail()
  @Length(1, 254)
  @ApiProperty()
  username: string;
  
  @IsString()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,128}$/)
  @ApiProperty()
  password: string;
}
