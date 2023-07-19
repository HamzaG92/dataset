import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, tap, map, first } from 'rxjs';
import { Dataset } from '../interfaces/dataset.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DatasetService {
  public datasets$: BehaviorSubject<Dataset[]> = new BehaviorSubject<Dataset[]>(
    []
  );
  public dataset$: BehaviorSubject<Dataset> = new BehaviorSubject<Dataset>(
    this.datasets$.value[0]
  );
  constructor(private httpclient: HttpClient) {}

  public getDatasets() {
    console.log('api environnement' + `${environment.apiBaseUrl}`);
    return this.httpclient.get(`${environment.apiBaseUrl}`).pipe(
      tap((datasets: Dataset[]) => {
        console.log(datasets);
        this.datasets$.next(datasets);
      })
    );
  }

  public getDataset(id: number) {
    return this.datasets$.pipe(
      filter((datasets: Dataset[]) => datasets != null),
      map((datasets: Dataset[]) => {
        return datasets.find((s) => s.id === id);
      })
    );
  }

  public PostDataset(dataset: Dataset) {
    return this.httpclient.post(`${environment.apiBaseUrl}`, dataset).pipe(
      tap((datasetCreated: Dataset) => {
        const value = this.datasets$.value;
        console.log('ds' + datasetCreated);
        this.datasets$.next([...value, datasetCreated]);
        console.log(this.datasets$.getValue());
      })
    );
  }

  public EditDataset(id: number, dataset: Dataset) {
    return this.httpclient
      .patch(`${environment.apiBaseUrl}/${id}`, dataset)
      .pipe(
        tap((data: Dataset) => {
          const value = this.datasets$.value;
          this.datasets$.next(
            value.map((dataset: Dataset) => {
              if (dataset.id === data.id) return data;
              else return dataset;
            })
          );
        })
      );
  }
}
