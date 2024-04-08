export class Status {
  public id!: number;
  public name!: string;

  constructor(id?: number) {
    if (id) {
      this.id = id;
    }
  }
}