import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
  standalone: true
})
export class ReversePipe implements PipeTransform {

  transform<T>(list: T[] | undefined): T[] {
    if (!list)
      return [];

    return list.slice().reverse();
  }

}
