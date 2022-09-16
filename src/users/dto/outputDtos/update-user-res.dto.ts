import { OmitType } from "@nestjs/swagger";
import { UpdateUserDto } from "../inputDtos";

export class UpdateUserResDto extends OmitType(UpdateUserDto, ['password'] as const) {
    constructor(data) {
        super();
        this.email=data.email;
        this.nickname=data.nickname;
    }
}