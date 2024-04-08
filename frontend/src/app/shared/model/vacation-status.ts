export class VacationStatus {
  public id!: number;
  public name!: string;

  constructor(id?: number) {
    if (id) {
      this.id = id;
    }
  }
}