import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class UsersCreateDto {
  @IsString()
  @Length(1, 256)
  @Matches(/[^\s]/)
  fullname: string;

  @IsString()
  @Length(1, 256)
  @Matches(/[^\s]/)
  username: string;

  @IsEmail()
  @Length(1, 254)
  email: string;

  @IsString()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,128}$/)
  password: string;
  
}
