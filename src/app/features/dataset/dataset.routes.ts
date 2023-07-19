import { Routes } from '@angular/router';
import { DatasetContainerComponent } from './dataset-container/dataset-container.component';
import { DatasetDetailComponent } from './dataset-container/dataset-detail/dataset-detail.component';
import { DatasetFormComponent } from './dataset-container/dataset-form/dataset-form.component';
import { DatasetEditComponent } from './dataset-container/dataset-edit/dataset-edit.component';

export const DATASET_ROUTES: Routes = [
  {
    path: '',
    component: DatasetContainerComponent,
    children: [
      { path: 'create', component: DatasetFormComponent },
      { path: ':index/edit', component: DatasetFormComponent },
      { path: ':index', component: DatasetDetailComponent },
    ],
  },
];
