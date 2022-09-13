import { OmitType } from "@nestjs/swagger";
import { UserDbDto } from "../../users/dto/user-db.dto";

export class JwtPayloadDto extends OmitType(UserDbDto, ['password'] as const){}
