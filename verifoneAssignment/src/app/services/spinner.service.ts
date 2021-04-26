import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {


  visibility = new BehaviorSubject<boolean>(false);
  spinnerState = this.visibility.asObservable();

  constructor() {
    this.visibility = new BehaviorSubject(false);
  }

  show(): void {
    this.visibility.next(true);
  }

  hide(): void {
    this.visibility.next(false);
  }
}
