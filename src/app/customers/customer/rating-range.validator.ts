import { AbstractControl } from "@angular/forms";

export const ratingRange = (c: AbstractControl): {[key: string]: boolean} | null => {
    if ( c.value != undefined && (isNaN(c.value) || c.value < 1 || c.value > 5) ) {
        return { 'range': true };
    }
    return null;
}