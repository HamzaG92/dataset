import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Dataset } from 'src/app/shared/interfaces/dataset.model';
import { DatasetService } from 'src/app/shared/services/dataset.service';
import { first } from 'rxjs';
import { Specificite } from 'src/app/shared/interfaces/specificite.model';

@Component({
  selector: 'app-dataset-form',
  templateUrl: './dataset-form.component.html',
  styleUrls: ['./dataset-form.component.css'],
})
export class DatasetFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private datasetService: DatasetService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('index');
      console.log('id to edit' + this.id);

      if (id !== null) {
        this.datasetService
          .getDataset(+id)
          //.pipe(first((x) => !!x))
          .subscribe((dataset: Dataset) => {
            this.dataset = dataset;
            this.form = this.InitForm(this.dataset);
          });
      } else {
        this.form = this.InitForm();
      }
    });

    //this.form = this.InitForm(this.dataset);
  }
  id: number;
  dataset: Dataset;
  form: FormGroup;
  get client() {
    return this.form.get('client');
  }
  get projet() {
    return this.form.get('projet');
  }
  get environnement() {
    return this.form.get('environnement');
  }
  get libelleDataSet() {
    return this.form.get('libelleDataSet');
  }
  get listeSpecificites() {
    return this.form.get('listeSpecificites') as FormArray;
  }
  getcle(i) {
    return (<FormArray>this.form.get('listeSpecificites')).controls[i].get(
      'cle'
    );
  }
  public InitForm(
    dataset: Dataset = {
      id: 0,
      client: '',
      environnement: '',
      libelleDataSet: '',
      listeSpecificites: [{ id: 0, description: '', cle: '' }],
      projet: '',
    }
  ) {
    return this.fb.group({
      id: [dataset.id],
      client: [dataset.client, Validators.required],
      projet: [dataset.projet, Validators.required],
      environnement: [dataset.environnement, Validators.required],
      libelleDataSet: [dataset.libelleDataSet, Validators.required],
      listeSpecificites: this.fb.array(
        dataset.listeSpecificites.map((speceficite) =>
          this.fb.group({
            id: [speceficite.id],
            cle: [speceficite.cle, Validators.required],
            description: [speceficite.description, Validators.required],
          })
        ),
        Validators.required
      ),
    });
  }

  public submit() {
    if (this.dataset) {
      console.log('in upadate');
      this.datasetService
        .EditDataset(this.dataset.id, this.form.value)
        .subscribe();
    } else {
      console.log('in create' + this.form.errors);
      this.datasetService.PostDataset(this.form.value).subscribe();
    }

    this.router.navigate(['/'], { relativeTo: this.activatedRoute });
  }
  public addSpeceficite() {
    this.listeSpecificites.push(
      this.fb.group({
        id: 0,
        cle: '',
        description: '',
      })
    );
  }
}
