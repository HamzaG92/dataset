import { Specificite } from './specificite.model';

export class Dataset {
  public id?: number;
  public client: string;
  public projet: string;
  public libelleDataSet: string;
  public environnement: string;
  public listeSpecificites?: Specificite[];

  constructor(
    id: number,
    client: string,
    projet: string,
    libelleDataSet: string,
    environnement: string,
    listeSpecificites: Specificite[]
  ) {
    this.id = id;
    this.client = client;
    this.projet = projet;
    this.libelleDataSet = libelleDataSet;
    this.environnement = environnement;
    this.listeSpecificites = listeSpecificites;
  }
}
