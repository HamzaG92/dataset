import { Routes } from '@angular/router';
import { AuthGuard } from './shared/auth/auth.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'datasets',
    pathMatch: 'full',
  },
  {
    path: 'datasets',
    loadChildren: () =>
      import('../app/features/dataset/dataset.module').then(
        (m) => m.DatasetModule
      ),
    canActivate: [AuthGuard],
  },
];
