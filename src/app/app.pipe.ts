import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchFilter'
  })

export class SearchFilterPipe implements PipeTransform {
    transform(value: any, args?: any) {
        if(!value)return null;
        if(!args)return value;

        return value.filter((item:any) => {
            return JSON.stringify(item.itemName).toLowerCase().includes(args.toLowerCase());
      });
    }
}