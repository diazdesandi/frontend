import { Component, Input } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Header, TableConfig } from '../../interfaces';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: [
    `
      small {
        color: red;
      }
    `,
  ],
  providers: [MessageService, ConfirmationService],
})
export class TableComponent<T> {
  @Input() config: TableConfig<T> = {} as TableConfig<T>;
  dialogHeader: string = '';
  displayDialog: boolean = false;
  header: Header = {} as Header;
  isNew: boolean = false;
  selectedRow: T = {} as T;
  uploadedFile: File | null = null;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  showDialogToAdd(): void {
    this.dialogHeader = 'Add New Item';
    this.showDialog(true, {} as T);
  }

  showDialogToEdit(rowData: T): void {
    this.dialogHeader = 'Edit Item';
    this.showDialog(false, rowData);
  }

  showDialog(isNew: boolean, data: T) {
    this.isNew = isNew;
    this.selectedRow = { ...data };
    this.displayDialog = true;
    this.uploadedFile = null;
    this.config.form.reset(); // Reset the form to clear any previous data
    if (!isNew) {
      this.onSelectedRow(data);
    }
  }

  onSelectedRow(data: T) {
    this.uploadedFile = (data as any)?.image;
    this.config.form.patchValue({
      ...data,
      location: (data as any)?.location?.id,
    });
  }

  hideDialog() {
    this.displayDialog = false;
  }

  addUpdateData() {
    const formData = {
      ...this.config.form.value,
      image: this.uploadedFile,
    };

    const operation = this.isNew
      ? this.config.actions.create(formData)
      : this.config.actions.update(formData, (this.selectedRow as any)['id']);

    operation.subscribe({
      next: (resp: any) => {
        this.updateData(resp);
        this.showMessage('success', 'Success!', resp.message);
        this.hideDialog();
      },
      error: (error: any) => {
        this.showMessage('error', 'Error', error.error.message);
      },
    });
  }

  delete(id: string, event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to delete this item?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.config.actions.delete(id).subscribe({
          next: (resp) => {
            this.config.data = this.config.data.filter(
              (item) => (item as any)['id'] !== id,
            );
            this.showMessage('success', 'Success!', resp.message);
          },
          error: (error) => {
            this.showMessage('error', 'Error', error.error.message);
          },
        });
      },
    });
  }

  onSelect(event: { files: File[] }) {
    this.uploadedFile = event.files[0];
  }

  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity,
      summary,
      detail,
    });
  }

  updateData(data: T) {
    if (this.isNew) {
      this.config.data.push(data);
    } else {
      this.config.data = this.config.data.map((item) =>
        (item as any)['id'] === (this.selectedRow as any)['id']
          ? { ...item, ...data }
          : item,
      );
    }

    this.config.data = [...this.config.data];
    this.selectedRow = {} as T;
    this.hideDialog();
  }

  getControl(name: string) {
    return this.config.form.get(name)!;
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
}
