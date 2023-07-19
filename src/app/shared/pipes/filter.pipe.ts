import { Pipe, PipeTransform } from '@angular/core';
import { Dataset } from '../interfaces/dataset.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: Dataset[], search: string): Dataset[] {
    return value.filter(
      (c) =>
        c.libelleDataSet.toLowerCase().includes(search.toLowerCase()) ||
        c.client.toLowerCase().includes(search.toLowerCase()) ||
        c.projet.toLowerCase().includes(search.toLowerCase()) ||
        c.environnement.toLowerCase().includes(search.toLowerCase())
    );
  }
}
