import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdownHeader]',
})
export class DropdownHeaderDirective {
  @HostBinding('class.open') isOpen = false;
  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
  constructor() {}
}
