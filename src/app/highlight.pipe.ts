import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
  standalone: true
})
export class HighlightPipe implements PipeTransform {

  transform(wholeText: string, inputValue: string): string {
    if (!inputValue) {
      return wholeText;
    }
    const re = new RegExp(inputValue, 'gi');
    return wholeText.replace(re, '<mark>$&</mark>');
  }

}
