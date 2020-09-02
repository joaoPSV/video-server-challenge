import { IsString } from "class-validator";

class ChangeHostRoomDto {
  @IsString()
  public roomId!: string;

  @IsString()
  public userId!: string;
}

export default ChangeHostRoomDto;
