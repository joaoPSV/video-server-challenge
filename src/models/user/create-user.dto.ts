import { IsString, ValidateIf } from "class-validator";

class CreateUserDto {
  @IsString()
  public username!: string;

  @IsString()
  public password!: string;

  @ValidateIf((data) => data.mobileToken)
  @IsString()
  public mobileToken?: string;
}

export default CreateUserDto;
