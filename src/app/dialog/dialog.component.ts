import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output, SimpleChanges,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  @Input({required: true}) title!: string;
  @Output() closed = new EventEmitter<boolean>();
  @ViewChild('dialog') dialogElement: ElementRef | undefined;

  closeDialog($event: boolean) {
    this.dialogElement?.nativeElement.close();
    this.closed.emit($event);
  }

  openDialog() {
    this.dialogElement?.nativeElement.showModal();
  }

  onKeyUp($event: KeyboardEvent) {
    if ($event.key === 'Escape') {
      console.log('here')
      this.closed.emit(false);
    }
  }
}
