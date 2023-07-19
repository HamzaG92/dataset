import { Component, OnInit } from '@angular/core';
import { DatasetService } from './shared/services/dataset.service';
import { AuthService } from './shared/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.datasetService.getDatasets().subscribe();
  }
  constructor(
    private datasetService: DatasetService,
    private authservice: AuthService
  ) {
    this.isDoneLoading$ = this.authservice.isDoneLoading$;
  }

  public isDoneLoading$: Observable<boolean>;

  title = 'dataset_v1';
}
