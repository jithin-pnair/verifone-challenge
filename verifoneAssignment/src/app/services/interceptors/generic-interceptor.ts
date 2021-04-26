import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { SpinnerService } from '../spinner.service';
import { catchError, finalize, tap } from 'rxjs/operators';

@Injectable()

export class GeneticInterceptor implements HttpInterceptor {

  constructor(private spinnerService: SpinnerService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    let observable;
    this.spinnerService.show();
    observable = req.clone({
      headers: req.headers.set('Authorization', 'Client-ID -tg5EuXH7ZwvsJIZt5Hh3w6IaMejDyV1As1NPg_vMWE'),
    });

    return next.handle(observable).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        this.spinnerService.hide();
      }
    }, (error) => {
      this.spinnerService.hide();
    })
    );

  }
}
