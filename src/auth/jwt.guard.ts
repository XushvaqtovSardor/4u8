import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as any;
    const authHeader = request.headers['authorization'] as string;
    if (!authHeader) throw new UnauthorizedException('Token yoq');

    const token = authHeader.replace('Bearer ', '') as string;
    const user = await this.authService.verifyToken(token);
    request.user = user;
    return true;
  }
}
