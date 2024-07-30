import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

interface DialogConfig {
  header: string;
  form: FormGroup;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent<T> {
  // @Input() config: DialogConfig = {} as DialogConfig;
  @Input() header: string = '';
  @Input() form: FormGroup = {} as FormGroup;
  @Input() fields: any[] = [];
  @Input() data: T = {} as T;
  @Input() visible: boolean = false;
  uploadedFile: File | null = null;

  @Output() onSave = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  handleData() {
    if (this.form.valid) {
      this.onSave.emit();
    }
  }

  closeDialog() {
    this.onCancel.emit();
  }

  onSelect(event: { files: File[] }) {
    this.uploadedFile = event.files[0];
  }

  getControl(name: string) {
    return this.form.get(name)!;
  }

  formValidation(name: string): boolean {
    const control = this.getControl(name);
    return control.invalid && (control.dirty || control.touched);
  }

  getErrorMessage(controlName: string): string {
    const control = this.getControl(controlName);

    if (control.hasError('required')) {
      return `${controlName} is required`;
    }

    if (control.hasError('minlength')) {
      return `${controlName} must be at least ${control.getError('minlength')
        ?.requiredLength} characters`;
    }

    if (control.hasError('pattern')) {
      return `${controlName} must be a number`;
    }

    if (control.hasError('email')) {
      return 'Please enter a valid email';
    }

    return '';
  }

  onSelectedRow(data: T) {
    this.uploadedFile = (data as any)?.image;
    this.form.patchValue({
      ...data,
      location: (data as any)?.location?.id,
    });
  }
}
