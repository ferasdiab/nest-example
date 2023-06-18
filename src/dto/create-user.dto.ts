import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty, ApiBody } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({ required: false, description: 'name of  task' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;
}
