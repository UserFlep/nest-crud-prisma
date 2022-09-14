import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getOk(): string {
    return 'Ок';
  }
}
