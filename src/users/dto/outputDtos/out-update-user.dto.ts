import { OmitType } from "@nestjs/swagger";
import { InUpdateUserDto } from "../inputDtos";

export class OutUpdateUserDto extends OmitType(InUpdateUserDto, ['password'] as const) {
    constructor(data) {
        super();
        this.email=data.email;
        this.nickname=data.nickname;
    }
}