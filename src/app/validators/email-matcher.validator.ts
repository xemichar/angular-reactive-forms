import { AbstractControl } from '@angular/forms';

export const emailMatcher = (c: AbstractControl): { [key: string]: boolean } | null => {
  const email = c.get('email');
  const confirmEmail = c.get('confirmEmail');

  if (email.pristine || confirmEmail.pristine) {
    return null;
  }

  if (email.value === confirmEmail.value) {
    return null;
  }
  return { match: true };
};
