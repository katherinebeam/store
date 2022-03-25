import { NgModule } from '@angular/core';
import { OnlyDigitsDirective } from './only-digits.directive';

@NgModule({
  declarations: [
    OnlyDigitsDirective,
  ], exports: [
    OnlyDigitsDirective,
  ],
})
export class DirectivesModule {
}
