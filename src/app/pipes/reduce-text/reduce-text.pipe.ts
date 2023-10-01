import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reduceText'
})
export class ReduceTextPipe implements PipeTransform {

  transform(value: string|undefined, ...args: number[]): string {
    if(value) return value.substring(0, args[0]);
    return '';
  }

}
