import { PickType } from "@nestjs/swagger";
import { UserDbDto } from "../user-db.dto";

export class LoginNicknameUserDto extends PickType(UserDbDto, ['nickname', 'password'] as const) {}