import {Component, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {DialogComponent} from "./dialog/dialog.component";
import {SimpleDialogComponent} from "./simple-dialog/simple-dialog.component";
import {FormDialogComponent} from "./form-dialog/form-dialog.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DialogComponent, SimpleDialogComponent, FormDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
}
