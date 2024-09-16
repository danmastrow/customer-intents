import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerIntentsModule } from './customer-intents/customer-intents.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), CustomerIntentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
