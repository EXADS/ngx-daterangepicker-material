import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[stopClickPropagation]'
})
export class StopPropagationDirective {

  @HostListener('click', ['$event'])
  stopClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }
}
