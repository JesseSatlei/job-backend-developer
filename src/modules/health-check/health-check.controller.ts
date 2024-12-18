import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './health-check.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('Health')
  @ApiOperation({ summary: 'Retorna o status da aplicação' })
  @ApiOkResponse({ type: 'string' })
  @Get()
  healthCheck(): string {
    return this.appService.getHello();
  }
}
