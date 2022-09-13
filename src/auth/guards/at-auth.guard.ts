import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AtAuthGuard extends AuthGuard('jwt-at') {}
//AuthGuard('strategy' or ['strategy1','strategy2'])
