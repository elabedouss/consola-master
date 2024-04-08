import { Status } from './status';
import { Employee } from './employee';
export class Project {
  public id!: number;
  public status!: Status;
  public name!: string;
  public shortName!: string;
  public startDate: Date = new Date();
  public endDate: Date = new Date();
  public employees: Array<Employee> = [];
}
