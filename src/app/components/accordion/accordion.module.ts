import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './accordion.component';
import { ToggleComponent } from './toggle.component';

@NgModule({
  declarations: [AccordionComponent, ToggleComponent],
  imports: [CommonModule],
  exports: [AccordionComponent, ToggleComponent],
})
export class AccordionModule { }
