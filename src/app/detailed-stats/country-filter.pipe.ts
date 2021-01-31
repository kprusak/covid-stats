import { Pipe, PipeTransform } from "@angular/core";
import { Stats } from "../stats.service"

@Pipe({
    name: 'countryFilter'
})
export class CountryFilterPipe implements PipeTransform {
    transform(stats: Stats[], searchTerm: string): Stats[] {
        if(!stats || !searchTerm) {
            return stats;
        }
        return stats.filter(stats => stats.country.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
}