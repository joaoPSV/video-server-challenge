import { IsString, ValidateIf } from "class-validator";

class UpdateUserDto {
  @ValidateIf((data) => data.password)
  @IsString()
  public password!: string;

  @ValidateIf((data) => data.mobileToken)
  @IsString()
  public mobileToken?: string;
}

export default UpdateUserDto;
