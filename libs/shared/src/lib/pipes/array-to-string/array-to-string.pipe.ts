import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayToString',
})
export class ArrayToStringPipe implements PipeTransform {
  transform(input: string[], separator: string = ', '): string {
    return input.join(separator).replace(/, ((?:.(?!, ))+)$/, ' and $1');
  }
}
