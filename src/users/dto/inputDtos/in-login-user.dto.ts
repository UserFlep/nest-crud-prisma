import { PickType } from "@nestjs/swagger";
import { UserDbDto } from "../user-db.dto";

export class InLoginUserDto extends PickType(UserDbDto, ['email', 'password'] as const) {}