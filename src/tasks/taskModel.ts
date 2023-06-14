import { User } from '@prisma/client';

export class TaskModel {
  id: string;
  name: string;
  status: Status;
  assinee: User | null;
  assineeId: number | null;

  constructor(
    id: string,
    name: string,
    status: Status,
    assinee: User | null,
    assineeId: number | null,
  ) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.assinee = assinee;
    this.assineeId = assineeId;
  }
}

export enum Status {
  New = 'New',
  Progress = 'Progress',
  Complete = 'Complete',
}
