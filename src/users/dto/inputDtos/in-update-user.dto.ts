import { PartialType } from "@nestjs/swagger";
import { InCreateUserDto } from "./in-create-user.dto";

export  class InUpdateUserDto extends PartialType(InCreateUserDto) {}