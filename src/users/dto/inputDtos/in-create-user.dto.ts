import { OmitType } from "@nestjs/swagger";
import { UserDbDto } from "../user-db.dto";

export  class InCreateUserDto extends OmitType(UserDbDto, ['uid'] as const) {}