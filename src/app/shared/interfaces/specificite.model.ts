export class Specificite {
  public id?: number;
  public cle: string;
  public description: string;

  constructor(id: number, cle: string, description: string) {
    this.id = id;
    this.cle = cle;
    this.description = description;
  }
}
