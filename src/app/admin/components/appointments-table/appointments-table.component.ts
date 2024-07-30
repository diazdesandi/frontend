import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import {
  Appointment,
  DialogProps,
  UserAppointment,
} from '../../../shared/interfaces';
import { Header } from '../../interfaces';
import { AppointmentsService, UserService } from '../../../shared/services';
import { appointmentFields } from '../../../shared/forms';

@Component({
  selector: 'app-appointments-table',
  templateUrl: './appointments-table.component.html',
  providers: [ConfirmationService, MessageService],
})
export class AppointmentsTableComponent {
  columns: string[] = [];
  dialog: DialogProps = {} as DialogProps;
  fields = appointmentFields;
  header: Header = {} as Header;
  isNew: boolean = false;
  messages: Message[] = [];
  selectedRow: Appointment = {} as Appointment;
  users: UserAppointment[] = [];

  constructor(
    private appointmentsService: AppointmentsService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    forkJoin([
      [this.generateColumns(), this.getUsers(), this.showMessages()],
    ]).subscribe();
  }

  createForm() {
    return this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      responsible: ['', Validators.required],
      start_hour: ['', Validators.required],
      end_hour: ['', Validators.required],
      location: ['', Validators.required],
      meetingRoom: ['', Validators.required],
    });
  }

  generateColumns() {
    this.columns = [
      'title',
      'description',
      'responsible',
      'start_hour',
      'end_hour',
      'meeting Room',
      'location',
      'address',
      'actions',
    ];
  }

  // CRUD
  showDialogToAdd(id: string): void {
    this.showDialog(id, true, {} as Appointment);
  }

  showDialogToEdit(id: string, data: Appointment): void {
    this.showDialog(id, false, data);
  }

  showDialog(id: string, isNew: boolean, data: Appointment) {
    this.isNew = isNew;
    this.selectedRow = { ...data };
    this.dialog = {
      header: isNew ? 'Add New Item' : 'Edit Item',
      display: true,
      form: this.createForm(),
    };
    this.dialog.form.reset();
    if (!isNew) {
      this.onSelectedRow(data);
    }
  }

  hideDialog() {
    this.dialog.display = false;
  }

  addUpdateData() {
    const formData = this.dialog.form.value;

    const operation = this.isNew
      ? this.appointmentsService.create(formData)
      : this.appointmentsService.update(formData);

    operation.subscribe({
      next: (resp) => {
        this.users = [...this.users];
        this.dialog.form.reset();
        this.dialog.display = false;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  delete(id: string) {}

  onSelectedRow(data: Appointment) {
    this.dialog.form.setValue({
      title: data.title,
      description: data.description,
      responsible: data.responsible,
      start_hour: data.start_hour,
      end_hour: data.end_hour,
      location: data.meetingRoom?.location.name,
      meetingRoom: data.meetingRoom?.name,
    });
  }

  // Form Validation
  formValidation(name: string) {
    const control = this.dialog.form.get(name);
    return control?.invalid && control?.touched;
  }

  getErrorMessage(controlName: string) {
    const control = this.dialog.form.get(controlName);

    if (control?.hasError('required') && control?.touched) {
      return 'This field is required';
    }

    return 'Error not handled';
  }

  getUsers() {
    this.userService.getAppointmentsByUser().subscribe((resp) => {
      this.users = resp;
      this.header = {
        title: 'Appointments',
        icon: 'pi pi-calendar',
        length: this.users.length,
        showButton: false,
      };
    });
  }

  showMessages() {
    this.messages = [
      {
        severity: 'info',
        summary: 'Info',
        detail: 'No appointments found',
      },
    ];
  }
}
