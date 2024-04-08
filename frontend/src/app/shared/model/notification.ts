import { Vacation } from './vacation';

export class Notification {
  public id!: number;
  public vacation!: Vacation;
  public message!: string;
  public date: Date = new Date();
  public seen: boolean = false;
}
