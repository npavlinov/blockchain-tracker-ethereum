import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ConfigurationsService } from './configuration.service';
import { CreateConfigurationDto } from './dto/create-configuration.dto';
import { UpdateConfigurationDto } from './dto/update-configuration.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller('configurations')
export class ConfigurationController {
  constructor(
    private readonly configurationsService: ConfigurationsService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Post()
  async create(@Body() createNoteDto: CreateConfigurationDto) {
    const configuration = await this.configurationsService.create(
      createNoteDto,
    );
    this.eventEmitter.emit('configuration', configuration.toJSON());
    return configuration;
  }

  @Get()
  findAll() {
    return this.configurationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.configurationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateConfigurationDto,
  ) {
    return this.configurationsService.update(+id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.configurationsService.remove(+id);
  }
}
