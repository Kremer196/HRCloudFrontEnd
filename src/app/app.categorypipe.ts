import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'categoryFilter'
  })

export class CategoryFilterPipe implements PipeTransform {
    transform(value: any, args?: any) {
        if(!value)return null;
        if(!args)return value;

        if(args == "All") return value;
        

        return value.filter((item:any) => {
            console.log(item)
            console.log(item.categoryID)
            console.log(args);
            return item.categoryName == args;
      });
    }
}