import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  RESPONSIVE_THRESHOLD_MOBILE: number = 600;
  RESPONSIVE_THRESHOLD: number = 1300;
  RESPONSIVE_THRESHOLD_MAX: number = 1900;
}
