import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'toggle',
  template: `
    <div class="toggle">
      <div class="toggle_heading" (click)="setActive.emit()">
        {{ title }}
      </div>
      <div *ngIf="active" class="toggle_content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
  /* Don't change it with OnPush because it's content projected */
})

export class ToggleComponent {
  @Input() active = false;
  @Input() title = 'Default title';
  @Output() setActive = new EventEmitter();
}
