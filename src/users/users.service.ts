import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import * as bcrypt from "bcrypt";
import { PhoneUserDto } from "./dto/phone-user.dto";
import * as otpGenerator from "otp-generator";
import { BotService } from "../bot/bot.service";
import { Otp } from "./models/otp.model";
import { AddMinutesToDate } from "../common/helpers/addMinutes";
import { timeStamp } from "console";
import { decode, encode } from "../common/helpers/cryptto";
import { verify } from "crypto";
import { VerifyUserDto } from "./dto/verify-otp.dto";
import { where } from "sequelize";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: typeof User,
  @InjectModel(Otp) private readonly otpModel: typeof Otp,
  private readonly botService: BotService
) {}

  async create(createUserDto: CreateUserDto) {
    const { password, confirm_password } = createUserDto;
    if (password !== confirm_password) {
      throw new BadRequestException("Passwords do not match.");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    const newUser = await this.userModel.create({
      ...createUserDto,
      password: hashed_password,
    });

    return newUser;
  }

  async findAll() {
    return await this.userModel.findAll();
  }

  async findOne(id: number) {
    return await this.userModel.findByPk(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updatedData = await this.userModel.update(updateUserDto, {
      where: { id },
      returning: true,
    });

    return updatedData[1][0];
  }

  async remove(id: number) {
    const user = await this.userModel.findByPk(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await user.destroy();
    return { message: `User with ID ${id} has been removed` };
  }
  async findUserByEmail(email: string) {
    return await this.userModel.findOne({ where: { email } });
  }
  async findByActivationLink(link: string): Promise<User | null> {
    return this.userModel.findOne({ where: { activation_link: link } });
  }
  async uptadeRefreshToken(id: number, refresh_token: string){
    const uptadeUser = await this.userModel.update(
      {refresh_token},
      {
        where: {id},
      }
    )
    return uptadeUser;
  }
  async activateUser(link: string) {
    if (!link) {
      throw new BadRequestException("Activation link not found");
    }
    
    const uptadeUser = await this.userModel.update(
      { is_active: true },
      {
        where: {
          activation_link: link,
          is_active: false,
        },
        returning: true,
      }
    );
    if (!uptadeUser[1][0]) {
      throw new BadRequestException("User already activate");
    }
    return {
      message: "User activate successfully",
      is_active: uptadeUser[1][0].is_active,
    };
  }

  async newOTP(phoneUserDto: PhoneUserDto){
    const phone_number = phoneUserDto.phone;
    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const isSend = await this.botService.sentOtp(phone_number, otp);
    if(!isSend){
      throw new BadRequestException("Avval botdan royxatdan oting")
    }
    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 5);
    await this.otpModel.destroy({where: {phone_number}});
    const dbOtp = await this.otpModel.create({
      otp, expiration_time, phone_number
    });

    const deatail = {
      timeStamp:now,
      phone_number,
      otp_id: dbOtp.id
    };

    const encodeDate = await encode(JSON.stringify(deatail));
    return {
      nessage: "OTP botga yuborildi",
      verification_key: encodeDate,
    }
  }

  async verifyOtp(verifyOtp: VerifyUserDto){
    const {phone, verification_key, otp} = verifyOtp;
    const decodedData = await decode(verification_key);
    const details = JSON.parse(decodedData);

    if(details.phone_number != phone){
      throw new BadRequestException("Otp bu telefon raqamga yuborilmagan")
    }
    const resultOTP = await this.otpModel.findOne({where: {id: details.otp_id}});

    if(resultOTP === null){
      throw new BadRequestException("Bunday otp mavjud emas");
    }

    if(resultOTP.varified){
      throw new BadRequestException("Bu  otp avval tekshirilgan");
    }
    if(resultOTP.expiration_time < new Date()){
      throw new BadRequestException("Bu otp vaqti otib ketgan");
    }

    if(otp != resultOTP.otp){
      throw new BadRequestException("OTP mos emas");
    }

    const user = await this.userModel.update({
      is_premium:true,
    }, {
      where: {phone},
      returning: true,
    });

    if(!user[1][0]){
      throw new BadRequestException("Bunday foydalanuvchi yoq");
    }

    resultOTP.varified = true;
    await resultOTP.save()
    return {message: "Siz primium user boldingiz",
      user: user[1][0]
    };
  }

}
