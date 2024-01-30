import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { MovieService } from './movie/movie.service';
import { MovieController } from './movie/movie.controller';
import { MovieModule } from './movie/movie.module';
import {
  ElasticsearchModule,
  ElasticsearchService,
} from '@nestjs/elasticsearch';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config], isGlobal: true }),
    MovieModule,
  ],
  controllers: [AppController, MovieController],
  providers: [AppService, MovieService],
})
export class AppModule {}
