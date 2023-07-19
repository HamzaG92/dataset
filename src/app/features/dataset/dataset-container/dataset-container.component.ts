import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Dataset } from 'src/app/shared/interfaces/dataset.model';
import { DatasetService } from 'src/app/shared/services/dataset.service';

@Component({
  selector: 'app-dataset-container',
  templateUrl: './dataset-container.component.html',
  styleUrls: ['./dataset-container.component.css'],
})
export class DatasetContainerComponent {
  constructor(private datasetService: DatasetService) {}
  public listDatasets$: Observable<Dataset[]> = this.datasetService.datasets$;
}
