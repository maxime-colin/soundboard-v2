import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'values',
  pure: false
})
export class ValuesPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if( ! value) {
      return null;
    }
    return Object.keys(value).map(key => value[key]);
  }

}