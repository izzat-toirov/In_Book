import {
  ConflictException,
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/models/user.model";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { SigninUserDto } from "../users/dto/signin-user.dto";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { MailService } from "../mail/mail.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtSerive: JwtService,
    private readonly usersService: UsersService,
    private readonly mailService: MailService
  ) {}
  private async generateTokens(user: User) {
    const payload = {
      id: user.id,
      is_active: user.is_active,
      is_premium: user.is_premium,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtSerive.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtSerive.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
  async signup(createUserDto: CreateUserDto) {
    const candidate = await this.usersService.findUserByEmail(
      createUserDto.email
    );
    if (candidate) {
      throw new ConflictException("User already exists");
    }
    const newUser = await this.usersService.create(createUserDto);
    try {
      await this.mailService.sendMail(newUser);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException(`While sending email error`);
    }
    return { message: `Royxatdan otdingiz , Akkauntni tasdiqlang` };
  }

  
  async signin(signinUserDto: SigninUserDto, res: Response) {
    const user = await this.usersService.findUserByEmail(signinUserDto.email);
    if (!user) {
      throw new UnauthorizedException("Password or Email incorrect");
    }
    const validPassword = await bcrypt.compare(
      signinUserDto.password,
      user.password
    );

    if (!validPassword) {
      throw new UnauthorizedException("Password or Email incorrect");
    }
    const { accessToken, refreshToken } = await this.generateTokens(user);

    user.refresh_token = await bcrypt.hash(refreshToken, 7);
    await user.save();
    res.cookie("refreshToken", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });

    return { message: "You signed in successfully", id: user.id, accessToken };
  }
}
