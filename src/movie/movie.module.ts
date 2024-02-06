import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MovieResolver } from './movie.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';

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
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [MovieService, MovieResolver],
  controllers: [MovieController],
  exports: [ElasticsearchModule],
})
export class MovieModule {}
