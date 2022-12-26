import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './loader/spinner.component';
import { EllipsisComponent } from './loader/ellipsis.component';
import { AccordionComponent } from './accordion/accordion.component';
import { AlertComponent } from './alert/alert.component';
import { ModalComponent } from './modal/modal.component';
import { NotificationComponent } from './notification/notification.component';
import { TabComponent } from './tab/tab.component';



@NgModule({
  declarations: [
    SpinnerComponent,
    EllipsisComponent,
    AlertComponent,
    ModalComponent,
    NotificationComponent,
    TabComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
