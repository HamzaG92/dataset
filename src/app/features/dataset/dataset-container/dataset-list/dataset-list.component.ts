import { Component, Input } from '@angular/core';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';
import { Dataset } from 'src/app/shared/interfaces/dataset.model';
import { DatasetService } from 'src/app/shared/services/dataset.service';

@Component({
  selector: 'app-dataset-list',
  templateUrl: './dataset-list.component.html',
  styleUrls: ['./dataset-list.component.css'],
})
export class DatasetListComponent {
  constructor(private datasetservice: DatasetService) {}
  search: string = '';

  @Input() listDataset: Dataset[] = [];
}
