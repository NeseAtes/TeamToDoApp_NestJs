import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


import { TeamOfUser } from 'database/entities/teams-of-user';

import { TeamOfUserCreateDto } from './dto/teams-of-user.create.dto';

import { TeamOfUserService } from './teams-of-user.service';

@Controller('teamofuser')
export class TeamOfUserController {
  constructor(private readonly service: TeamOfUserService) {}

  @UseGuards(AuthGuard('user-from-jwt'))
  @Post('/')
  async create(@Body() dto: TeamOfUserCreateDto, @Req() req: any): Promise<TeamOfUser> {
    return this.service.create(dto);
  }
  
  
  @UseGuards(AuthGuard('user-from-jwt'))
  @Delete('/')
  async destroyMember(@Query('member_id') member_id: string): Promise<void> {
    return this.service.destroyByMemberId(member_id);
  }
}