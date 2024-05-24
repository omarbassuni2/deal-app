import { ConfigModule, ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { ENV_CONSTANTS } from './constant';
import { Connection } from 'mongoose';
import { JwtModule } from '@nestjs/jwt';

export class TestUtils {
  static getTestConfigModule() {
    return ConfigModule.forRoot({ isGlobal: true });
  }

  static getTestMongooseModule(dbName: string) {
    return MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>(ENV_CONSTANTS.DB_URI),
        dbName: `deal-app-test-${dbName}`,
        connectionFactory: (connection: Connection) => {
          connection.db.dropDatabase(); // Drop all collections before establishing the connection, to ensure db isolation
          return connection;
        },
      }),
      inject: [ConfigService],
    });
  }

  static getTestJwtModule() {
    return JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>(ENV_CONSTANTS.JWT_SECRET),
        signOptions: { expiresIn: '120s' },
      }),
      inject: [ConfigService],
    });
  }

  static getTestMongooseSchemas(schemas: ModelDefinition[]) {
    return MongooseModule.forFeature(schemas);
  }
}
