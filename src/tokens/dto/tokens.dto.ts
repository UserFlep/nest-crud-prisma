import { ApiProperty } from "@nestjs/swagger";

export class TokensDto {
  @ApiProperty({example: "eyCJ9.eyJ1aWQiOQt5MzI.Hf0fE3CQ9m_DQo", description: "Токен доступа"})
  readonly accessToken: string;
  @ApiProperty({example: "1800", description: "Срок действия"})
  readonly expiresIn: number;
  @ApiProperty({example: "dERCh4g9.dfE6TGdsfE3QtdTe3I.1aWQiOE3CQ9m4CQ", description: "Токен обновления"})
  readonly refreshToken: string;
}
