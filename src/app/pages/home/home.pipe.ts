import { Pipe, PipeTransform } from '@angular/core';
import { Empleo } from 'src/app/_models/empleo';

@Pipe({
  name: 'paisPipe'
})
export class PaisPipe implements PipeTransform{
    transform(items: Empleo[], searchText: string): any[] {
        if (!items) return [];

        if(searchText == null) return items;

        let ret: Empleo[] = [];
        for(let i=0;i<items.length;i++){
            let it = items[0];
            let contains = false;
            for(let j=0;j<it.area.length;j++){
                let area = it.area[j];
                if(searchText.includes(area)){
                    contains = true;
                    break;
                }
            }
            if(contains){
                ret.push(it);
            }else{
                for(let j=0;j<it.ubicacion.length;j++){
                    let ubicacion = it.ubicacion[j];
                    if(searchText.includes(ubicacion)){
                        contains = true;
                        break;
                    }
                }
                if(contains){ret.push(it);}    
            }
        }
        return ret;
    }
}