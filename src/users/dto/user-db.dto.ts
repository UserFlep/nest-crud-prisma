import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsLowercase, IsString, IsUppercase, IsUUID, Length, Matches, MaxLength } from "class-validator";

export class UserDbDto {
  @ApiProperty({example: "d7dc1f44-284b-4fcc-b66c-fd9934b1d390", description: "Уникальный идентификатор"})
  @IsUUID()
  uid: string;

  @ApiProperty({example: "ivan123", description: "Уникальный никнейм"})
  @IsString()
  @Length(3, 30)
  nickname: string;

  @ApiProperty({example: "qERds325Wt1!", description: "Пароль"})
  @IsString()
  @Length(8,100)
  @Matches(new RegExp("[0-9]+"), {message: "at least 1 digit is required"})
  @Matches(new RegExp("[a-z]+"), {message: "at least 1 lowercase letter is required"})
  @Matches(new RegExp("[A-Z]+"), {message: "at least 1 capital letter required"})
  password: string;

  @ApiProperty({example: "ivan@gmail.com", description: "Почтовы адрес"})
  @IsEmail()
  @MaxLength(100)
  email: string;
}