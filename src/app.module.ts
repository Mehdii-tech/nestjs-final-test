import { InjectConnection } from '@nestjs/mongoose';
import { AppRoutingModule } from './app.routing-module';
import { ConfigurationModule } from './infrastructure/configuration/configuration.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { Module, OnModuleInit } from '@nestjs/common';
import { Connection } from 'mongoose';

@Module({
    imports: [AppRoutingModule, ConfigurationModule, DatabaseModule],
})
export class AppModule implements OnModuleInit {
    constructor(@InjectConnection() private readonly connection: Connection) {}
    async onModuleInit() {
      if (this.connection.readyState === 1) {
        console.log('MongoDB connected successfully!');
      } else {
        console.error('MongoDB connection failed!');
      }
    }
}
