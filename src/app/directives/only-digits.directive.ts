import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyDigits]',
})
export class OnlyDigitsDirective {

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const allowedSpecialKeys = ['ArrowLeft', 'ArrowRight', 'Backspace', 'Delete'];
    if (!/^\d+$/.test(event.key) && allowedSpecialKeys.indexOf(event.key) === -1) {
      event.preventDefault();
    }
  }

}
