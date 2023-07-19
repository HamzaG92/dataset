import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DATASET_ROUTES } from './dataset.routes';
import { DatasetContainerComponent } from './dataset-container/dataset-container.component';

import { DatasetListComponent } from './dataset-container/dataset-list/dataset-list.component';

import { DatasetDetailComponent } from './dataset-container/dataset-detail/dataset-detail.component';

import { DatasetFormComponent } from './dataset-container/dataset-form/dataset-form.component';
import { DatasetEditComponent } from './dataset-container/dataset-edit/dataset-edit.component';

import { SharedModule } from 'src/app/shared/modules/shared.module';
@NgModule({
  declarations: [
    DatasetListComponent,
    DatasetContainerComponent,
    DatasetDetailComponent,
    DatasetFormComponent,
    DatasetEditComponent,
  ],
  imports: [RouterModule.forChild(DATASET_ROUTES), SharedModule],
})
export class DatasetModule {}
