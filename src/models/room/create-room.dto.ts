import { IsString, ValidateIf, IsNumber } from "class-validator";

class CreateRoomDto {
  @IsString()
  public name!: string;

  @ValidateIf((data) => data.limit)
  @IsNumber()
  public limit!: string;
}

export default CreateRoomDto;
