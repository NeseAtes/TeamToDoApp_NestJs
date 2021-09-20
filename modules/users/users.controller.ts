import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


import { User } from 'database/entities/user.entity';

import { UsersCreateDto } from 'modules/users/dto/users.create.dto';
import { UsersLoginDto } from 'modules/users/dto/users.login.dto';
import { UsersLookupDto } from 'modules/users/dto/users.lookup.dto';
import { UsersUpdatePasswordDto } from 'modules/users/dto/users.update-password.dto';

import { UsersService } from 'modules/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get('/')
  @UseGuards(AuthGuard('user-from-jwt'))
  async lookup(
    @Query() dto: UsersLookupDto,
  ): Promise<{
    count: number;
    rows: User[];
  }> {
    return this.service.lookup(dto);
  }

  @Get('/@me')
  @UseGuards(AuthGuard('user-from-jwt'))
  async getCurrentUser(@Req() req: any): Promise<User> {
    return req.user;
  }

  @Post('/')
  async create(@Body() dto: UsersCreateDto): Promise<{ user: User; token: string}> {
    return this.service.create(dto);
  }
  
  @Post('/login')
  //@UseGuards(AuthGuard('user-from-jwt'))
  async login(@Body() dto: UsersLoginDto): Promise<{ user: User; token: string}> {
    return this.service.login(dto);
  }



  @Patch('/password')
  @UseGuards(AuthGuard('user-from-jwt'))
  async updatePassword(@Body() dto: UsersUpdatePasswordDto, @Req() req: any): Promise<void> {
    dto.id = req.user.id;

    return this.service.updatePassword(dto);
  }



  @Delete('/:username')
  @UseGuards(AuthGuard('user-from-jwt'))
  async destroyUser(@Param('username') username: string): Promise<void> {
    return this.service.destroy(username);
  }
}