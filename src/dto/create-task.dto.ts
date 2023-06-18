import { IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty, ApiBody } from '@nestjs/swagger';

export class CreateTaskDTO {
  @ApiProperty({ required: false, description: 'name of  task'  })
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsInt()
  assineeId: number;
}
