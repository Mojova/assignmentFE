import {Component, ViewChild} from '@angular/core';
import {DialogComponent} from "../dialog/dialog.component";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";

interface FormData {
  name: string
  age: string
  favoriteColor: string
}

@Component({
  selector: 'app-form-dialog',
  standalone: true,
  imports: [
    DialogComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './form-dialog.component.html',
  styleUrl: './form-dialog.component.css'
})
export class FormDialogComponent {

  @ViewChild(DialogComponent) dialog?: DialogComponent<FormData>;

  form = this.formBuilder.group({name: '', age: '', favoriteColor: ''})

  result = '';

  constructor(private formBuilder: FormBuilder) {
  }

  dismiss() {
    this.dialog?.closeDialog()
    this.form.reset();
  }

  open() {
    this.dialog?.openDialog();
  }

  onSubmit() {
    const formData: FormData = {
      name: this.form.value.name || '',
      age: this.form.value.age || '',
      favoriteColor: this.form.value.favoriteColor || '',
    }
    this.dialog?.closeDialog(formData);
    this.form.reset();
  }

  onClose(payload?: FormData) {
    if (!payload) {
      this.result = 'User dismissed dialog.'
    } else {
      const {name, age, favoriteColor} = payload;
      this.result = `Name ${name}, age ${age}, favorite color ${favoriteColor}`;
    }
  }

}
