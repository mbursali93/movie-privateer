import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import {
  ElasticsearchModule,
  ElasticsearchService,
} from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('ELASTIC_URL'),
        auth: {
          username: configService.get('ELASTIC_USERNAME'),
          password: configService.get('ELASTIC_PASSWORD'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MovieService],
  controllers: [MovieController],
  exports: [ElasticsearchModule],
})
export class MovieModule {}
