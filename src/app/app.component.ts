import {Component, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {DialogComponent} from "./dialog/dialog.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'assignmentFE';
  result = '';

  @ViewChild(DialogComponent) dialog?: DialogComponent;

  openDialog() {
    this.dialog?.openDialog();
  }

  closeDialog(result: boolean) {
    this.dialog?.closeDialog(result);
  }

  onClose($event: boolean) {
    this.result = $event ? 'User clicked ok' : 'User canceled or dismissed';
  }
}
