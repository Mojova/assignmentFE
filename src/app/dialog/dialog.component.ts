import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent<T> {
  @Input({required: true}) title!: string;
  /**
   * The data emitted when the modal is closed. Undefined on modal dismiss (X button).
   *
   * Bug: This is not called on Esc, as the browser handles modal dismissal.
   */
  @Output() closed = new EventEmitter<T>();

  @ViewChild('dialog') dialogElement: ElementRef | undefined;

  closeDialog(payload?: T) {
    this.dialogElement?.nativeElement.close();
    this.closed.emit(payload);
  }

  openDialog() {
    this.dialogElement?.nativeElement.showModal();
  }
}

