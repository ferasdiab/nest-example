import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiBody } from '@nestjs/swagger';

export class CreateTaskDTO {
  @ApiProperty({ required: false, description: 'name of  task' })
  @IsNotEmpty()
  name: string;

  @IsString()
  assineeId: string;
}
