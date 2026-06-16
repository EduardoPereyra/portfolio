import { Component, effect, input, output } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  imports: [],
  templateUrl: './snackbar.html',
  styleUrl: './snackbar.css',
})
export class Snackbar {
  type = input<string | undefined>('');
  message = input<string | undefined>('');

  // Emit event when snackbar is dismissed
  dismissed = output<void>();

  constructor() {
    effect(() => {
      console.log(this.message());
      if (this.message()) {
        setTimeout(() => {
          this.dismissed.emit();
        }, 5000);
      }
    });
  }
}
