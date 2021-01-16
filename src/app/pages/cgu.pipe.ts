import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cgu'
})
export class CguPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
