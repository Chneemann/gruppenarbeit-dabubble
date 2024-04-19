import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToggleBooleanService {

  constructor() { }

  openSearchWindow: boolean = false;
}
