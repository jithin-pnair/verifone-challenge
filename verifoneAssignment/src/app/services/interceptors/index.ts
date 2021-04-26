import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GeneticInterceptor } from './generic-interceptor';


export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: GeneticInterceptor, multi: true }
];
