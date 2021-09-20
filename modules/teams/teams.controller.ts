import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards,UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


import { User } from 'database/entities/user.entity';
import { Teams } from 'database/entities/teams.entity';

import { TeamsCreateDto  } from 'modules/teams/dto/teams.create.dto';
import { TeamsLookupDto } from 'modules/teams/dto/teams.lookup.dto';

import { TeamsService } from 'modules/teams/teams.service';
import { TeamOfUserCreateDto } from 'modules/teams-of-user/dto/teams-of-user.create.dto';
import { isDefined } from 'class-validator';

@Controller('teams')
export class TeamsController {
  constructor(private readonly service: TeamsService) {}

  @Get('/')
  @UseGuards(AuthGuard('user-from-jwt'))
  async lookup(
    @Query() dto: TeamsLookupDto,
  ): Promise<{
    count: number;
    rows: Teams[];
  }> {
    return this.service.lookup(dto);
  }


  @Post('/')
  @UseGuards(AuthGuard('user-from-jwt'))
  async create(@Body() dto: TeamsCreateDto, @Req() req: any): Promise<Teams> {
    if (isDefined(dto.captainId)) {
      throw new UnauthorizedException();
    }
    dto.captainId = req.user.id;
    return this.service.create(dto);
  }
  

  @Delete('/')
  @UseGuards(AuthGuard('user-from-jwt'))
  async destroyMember(@Query('id') id: string): Promise<void> {
    return this.service.deleteMember(id);
  }
}