import { Component } from '@angular/core';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public spinnerService: SpinnerService) {

  }

  get isSpinnerVisible(): any {
    if (this.spinnerService && this.spinnerService.visibility) {
      return true;
    } else {
      return false;
    }
  }
}
