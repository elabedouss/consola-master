import { Employee } from './employee';
import { VacationStatus } from './vacation-status';
export class Vacation {
  public id!: number;
  public employee!: Employee;
  public requestDate!: Date;
  public startDate!: Date ;
  public endDate!: Date;
  public duration!: number;
  public comment!: string;
  public vacationStatus!: VacationStatus;
}
