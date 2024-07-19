import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'elapsedTime',
  pure: false,
  standalone: true
})
export class ElapsedTimePipe implements PipeTransform {

  private pluralize(value: number, desc: string): string {
    if (value > 1) {
      return value + desc.replace('(s)', 's');
    } else {
      return value + desc.replace('(s)', '');
    }
  }

  transform(timestamp: string): string {
    const now = new Date().getTime();
    const messageTime = new Date(timestamp).getTime();
    const difference = now - messageTime;

    if (difference < 1000 * 60) {
      return 'Just now';
    } else if (difference < 1000 * 60 * 60) {
      return this.pluralize(Math.floor(difference / (1000 * 60)), ' minute(s) ago');
    } else if (difference < 1000 * 60 * 60 * 24) {  // 24 hours
      return this.pluralize(Math.floor(difference / (1000 * 60 * 60)), ' hour(s) ago');
    } else if (difference < 1000 * 60 * 60 * 24 * 7) {  // 7 days
      return this.pluralize(Math.floor(difference / (1000 * 60 * 60 * 24)), ' day(s) ago');
    } else {
      return new Date(timestamp).toLocaleDateString();
    }
  }
}
