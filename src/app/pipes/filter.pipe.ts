import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(list: Object[], field:string, value:string): Object[] {

    if(!list) return [];
    if(!field) return list;

    let regExp = new RegExp(value,'i');
    return list.filter(element => element[field].match(regExp));

  }

}
