import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { GoogleStrategy } from 'src/utils/GoogleStrategy';
import { User } from './entities/user.entity';
import { SessionSerializer } from 'src/utils/Serializer';
import { ElasticModule } from 'src/database/elastic.module';
import { Director } from './entities/directors.entity';
import { Movie } from 'src/models/movie.model';
import { Actor } from './entities/actors.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        // host: configService.get('DB_HOST'),
        port: 5432,
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASS'),
        database: configService.get('POSTGRES_DB'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Director, Movie, Actor]),
    ElasticModule,
  ],
  providers: [UserService, GoogleStrategy, SessionSerializer],
  controllers: [UserController],
})
export class UserModule {}
