import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RtAuthGuard extends AuthGuard('jwt-rt') {}
//AuthGuard('strategy' or ['strategy1','strategy2'])