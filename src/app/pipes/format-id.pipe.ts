import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatId',
})
export class FormatIdPipe implements PipeTransform {
  transform(id: number): string {
    return '#' + String(id).padStart(5, '0');
  }
}
