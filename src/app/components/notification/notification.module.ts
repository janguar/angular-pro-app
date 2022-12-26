import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from './notification.service';
import { MaterialNotificationComponent } from './material-notification.component';

@NgModule({
  declarations: [MaterialNotificationComponent],
  imports: [CommonModule],
  exports: [MaterialNotificationComponent],
  providers: [NotificationService],
})
export class NotificationModule { }
