import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


import { Tasks } from 'database/entities/tasks.entity';

import { TasksCreateDto  } from 'modules/tasks/dto/tasks.create.dto';
import { TasksLookupDto } from 'modules/tasks/dto/tasks.lookup.dto';

import { TasksService } from 'modules/tasks/tasks.service';
import { TasksUpdateDto } from './dto/tasks.taskUpdate.dto';
import { CheckUpdateDto } from './dto/tasks.checkUpdate.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly service: TasksService) {}


  @Get('/')
  @UseGuards(AuthGuard('user-from-jwt'))
  async lookup(
    @Query() dto: TasksLookupDto,
  ): Promise<{
    count: number;
    rows: Tasks[];
  }> {
    return this.service.lookup(dto);
  }


  @Post('/')
  @UseGuards(AuthGuard('user-from-jwt'))
  async create(@Body() dto: TasksCreateDto): Promise<{ tasks: Tasks }> {
    return this.service.create(dto);
  }

  @Patch('/')
  @UseGuards(AuthGuard('user-from-jwt'))
  async updateTasks(@Body() dto: TasksUpdateDto, @Req() req: any): Promise<Tasks> {
    return this.service.updateTask(dto);
  }

  @Patch('/check')
  @UseGuards(AuthGuard('user-from-jwt'))
  async updateChecked(@Body() dto: CheckUpdateDto, @Req() req: any): Promise<Tasks> {
    return this.service.checkedTask(dto);
  }


  @Delete('/:id')
  @UseGuards(AuthGuard('user-from-jwt'))
  async destroyTask(@Param('id') id: string): Promise<void> {
    return this.service.destroy(id);
  }
  
}