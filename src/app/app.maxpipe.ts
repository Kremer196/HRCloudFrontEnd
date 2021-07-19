import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'maxFilter'
  })

export class MaxFilterPipe implements PipeTransform {
    transform(value: any, args?: any) {
        if(!value)return null;
        if(!args || isNaN(Number(args)))return value;

    
        

        return value.filter((item:any) => {
            return item.itemPrice <= Number(args);
      });
    }
}