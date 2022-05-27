import { Injectable } from '@nestjs/common';
import { CreateConfigurationDto } from './dto/create-configuration.dto';
import { Configuration } from './models/configuration.model';
import { UpdateConfigurationDto } from './dto/update-configuration.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ConfigurationsService {
  constructor(
    @InjectModel(Configuration)
    private readonly configurationModel: typeof Configuration,
  ) {}

  public async create(
    createConfigurationDto: CreateConfigurationDto,
  ): Promise<Configuration> {
    return this.configurationModel.create<Configuration>({
      ...createConfigurationDto,
    });
  }

  public async findOne(id: number): Promise<Configuration> {
    return this.configurationModel.findOne({
      where: {
        id,
      },
    });
  }

  public async findAll(): Promise<Configuration[]> {
    return this.configurationModel.findAll();
  }

  /**
   * Function to get the last configuration in order to load it on restart
   * @returns last configuration
   */
  public async findLast(): Promise<Configuration[]> {
    return await this.configurationModel.findAll({
      limit: 1,
      order: [['createdAt', 'DESC']],
      raw: true,
    });
  }

  public async update(
    id: number,
    UpdateConfigurationDto: UpdateConfigurationDto,
  ) {
    return this.configurationModel.update(UpdateConfigurationDto, {
      where: { id },
    });
  }

  public async remove(id: number) {
    const configuration = await this.findOne(id);
    await configuration.destroy();
  }
}
