import { Status } from '../tasks/taskModel';
import { ApiProperty, ApiBody } from '@nestjs/swagger';

export class SearchTasks {
  @ApiProperty({ required: false, description: 'name of  task' })
  name: string;

  @ApiProperty({
    required: false,
    description: 'status of  task',
    enum: Status,
  })
  status: Status;

  assineeId: string;
}
