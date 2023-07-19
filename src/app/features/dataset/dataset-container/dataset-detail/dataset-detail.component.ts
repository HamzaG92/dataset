import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Dataset } from 'src/app/shared/interfaces/dataset.model';
import { DatasetService } from 'src/app/shared/services/dataset.service';

@Component({
  selector: 'app-dataset-detail',
  templateUrl: './dataset-detail.component.html',
  styleUrls: ['./dataset-detail.component.css'],
})
export class DatasetDetailComponent implements OnInit, OnDestroy {
  constructor(
    private activatedRoute: ActivatedRoute,
    private datasetService: DatasetService
  ) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.idDataset = +param.get('index');
      console.log(this.idDataset);
      this.subscription = this.datasetService
        .getDataset(this.idDataset)
        .subscribe((dataset: Dataset) => {
          this.dataset = dataset;
          console.log(this.dataset.listeSpecificites);
          this.dataSource = this.dataset.listeSpecificites;
        });
    });
  }
  subscription: Subscription = new Subscription();
  idDataset: number;
  dataset: Dataset;
  displayedColumns: string[] = ['cle', 'description'];
  dataSource;
}
