import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConfigurationDto } from './dto/create-configuration.dto';
import { Configuration } from './entities/configuration.entity';
import { plainToClass } from 'class-transformer';
import { UpdateConfigurationDto } from './dto/update-configuration.dto';
import { wrap } from '@mikro-orm/core';

@Injectable()
export class ConfigurationsService {
  constructor(
    @InjectRepository(Configuration)
    private readonly configurationsRepo: EntityRepository<Configuration>,
  ) {}

  public async create(
    createConfigurationDto: CreateConfigurationDto,
  ): Promise<Configuration> {
    const configuration: Configuration = this.configurationsRepo.create(
      plainToClass(Configuration, createConfigurationDto),
    );
    await this.configurationsRepo.persistAndFlush(configuration);
    return configuration;
  }

  public async findByIdOrFail(id: number): Promise<Configuration> {
    const configuration: Configuration | null =
      await this.configurationsRepo.findOne(id);
    if (!configuration) {
      throw new NotFoundException('Configuration not found');
    }
    return configuration;
  }

  public async findAll(): Promise<Configuration[]> {
    return this.configurationsRepo.findAll();
  }

  public async findLast(): Promise<Configuration[]> {
    return await this.configurationsRepo.findAll({
      limit: 1,
      orderBy: { createdAt: -1 },
    });
  }

  public async update(
    id: number,
    UpdateConfigurationDto: UpdateConfigurationDto,
  ): Promise<void> {
    const configuration: Configuration =
      await this.configurationsRepo.findOneOrFail(id);
    wrap(configuration).assign(UpdateConfigurationDto);
    await this.configurationsRepo.flush();
  }

  public async remove(id: number) {
    const configuration: Configuration | null =
      await this.configurationsRepo.findOne(id);
    if (configuration) {
      await this.configurationsRepo.removeAndFlush(configuration);
    }
  }
}
