import { AfterContentInit, Component, ContentChildren, OnInit, QueryList } from '@angular/core';
import { ToggleComponent } from './toggle.component';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit, AfterContentInit {
  @ContentChildren(ToggleComponent) toggles!: QueryList<ToggleComponent>;

  // @ContentChildren(ChildDirective) contentChildren!: QueryList<ChildDirective>;



  ngAfterContentInit() {
    this.toggles.map((toggle, i) => {
      toggle.setActive.subscribe(() => this.setActive(i));
    });
  }

  setActive(index: number) {
    this.toggles.map((toggle, i) => {
      index !== i || toggle.active === true
        ? (toggle.active = false)
        : (toggle.active = true);
    });
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}


