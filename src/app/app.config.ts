import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { jwtInterceptor } from './jwt/jwt-interceptor.service';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    { provide: ReactiveFormsModule, useValue: ReactiveFormsModule },
    provideHttpClient(withInterceptors([jwtInterceptor])),
    { provide: CommonModule, useValue: CommonModule } 
  ]
};