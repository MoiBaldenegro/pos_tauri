import { Controller, Get } from '@nestjs/common';
// @ts-ignore
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Funciona perfectamente';
  }
}
