import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
  } from "@nestjs/common";
  import { JwtService } from "@nestjs/jwt";
  import { Observable } from "rxjs";
  
  @Injectable()
  export class SelfGuart implements CanActivate {
    constructor(private readonly Jwtservisw: JwtService) {}
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const req = context.switchToHttp().getRequest();
  
      if (req.user.id != req.params.id) {
        throw new ForbiddenException({
          message: "Ruxsat berilmagan foydalanuvchi",
        });
      }
      return true;
    }
  }
  