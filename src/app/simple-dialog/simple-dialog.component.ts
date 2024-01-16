import {Component, ViewChild} from '@angular/core';
import {DialogComponent} from "../dialog/dialog.component";

@Component({
  selector: 'app-simple-dialog',
  standalone: true,
  imports: [
    DialogComponent
  ],
  templateUrl: './simple-dialog.component.html',
  styleUrl: './simple-dialog.component.css'
})
export class SimpleDialogComponent {
  @ViewChild(DialogComponent) dialog?: DialogComponent<boolean>;
  result: string = '';

  close(result: boolean) {
    this.dialog?.closeDialog(result)
  }

  open() {
    this.dialog?.openDialog();
  }

  onClose($event: boolean) {
    this.result = $event ? 'User clicked OK.' : 'User dismissed dialog.';
  }
}
