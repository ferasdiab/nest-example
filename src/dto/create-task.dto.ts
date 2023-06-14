import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateTaskDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsInt()
  assineeId: number;
}
