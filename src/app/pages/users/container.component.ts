import { Component } from '@angular/core';

@Component({
  selector: 'app-container',
  template: `
      <div class="p-4">
        <div class="container">
            <router-outlet></router-outlet>
        </div>
      </div>

  `,
  styles: [``]
})
export class ContainerComponent {

}
