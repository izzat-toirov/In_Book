import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
  } from "@nestjs/common";
  import { JwtService } from "@nestjs/jwt";
  import { Request } from "express";
  
  @Injectable()
  export class IsCreatorGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const req: Request | any = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
  
      if (!authHeader) {
        throw new UnauthorizedException("Token topilmadi");
      }
  
      const [bearer, token] = authHeader.split(" ");
      if (bearer !== "Bearer" || !token) {
        throw new UnauthorizedException("Token formati notogri");
      }
  
      let payload: any;
      try {
        payload = await this.jwtService.verify(token, {
          secret: process.env.ACCESS_TOKEN_KEY,
        });
      } catch (error) {
        console.log(error);
        throw new UnauthorizedException("Token notogri yoki eskirgan");
      }
  
      if (!payload.is_active) {
        throw new ForbiddenException("Foydalanuvchi faol emas");
      }
  
      if (!payload.is_creator) {
        throw new ForbiddenException("Faqat yaratgan admin kirishi mumkin");
      }
  
      req.user = payload;
      return true;
    }
  }
  