import { FormControl } from '@angular/forms';

export class RutValidator {
  static checkRut(fc: FormControl) {
    let rut = fc.value;
    rut = rut.replace(/\./g, '');
    if (!/^[0-9]+[-]{1}[0-9kK]{1}$/.test(rut)) {
      return { checkRut: true };
    }
    const tmp = rut.split('-');
    let dv = tmp[1];
    let _rut = tmp[0];
    if (dv === 'k') {
      dv = 'K';
    }
    let M = 0,
      S = 1;
    for (; _rut; _rut = Math.floor(_rut / 10))
      S = (S + (_rut % 10) * (9 - (M++ % 6))) % 11;
    const checkDv = S ? (S - 1).toString() : 'K';
    if (dv === checkDv) {
      return null;
    }
    return { checkRut: true };
  }
}
