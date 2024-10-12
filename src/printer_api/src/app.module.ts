import { Module } from '@nestjs/common';
// @ts-ignore
import { AppController } from './app.controller';
// @ts-ignore

import { AppService } from './app.service';
import { PrinterModule } from './printer/printer.module';

@Module({
  imports: [PrinterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
