import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import {
  Appointment,
  AppointmentResponse,
  ConfirmationStatus,
} from '../../../shared/interfaces';
import { AppointmentsService } from '../../../shared/services';
import { AuthService } from '../../../auth/services/auth.service';
import { SchedulerService } from '../../services/scheduler.service';

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
})
export class ConfirmationPageComponent {
  isLoading: boolean = false;

  constructor(
    private appointmentService: AppointmentsService,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private schedulerService: SchedulerService
  ) {}

  // user = computed(() => this.authService.currentUser()!.id);
  // appointment = this.schedulerService.currentAppointment();
  appointment = {
    title: 'Meeting with team #2',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    responsible: 'John Doe',
    invited: [
      {
        user: {
          id: '40780b1a-0a49-4c32-82af-f4b6b902b18c',
          name: 'Test 1',
          email: 'test1@test.com',
          image:
            'https://res.cloudinary.com/dl2gtzbk4/image/upload/v1712742514/msliga8m0yxayzqegzkx.png',
        },
        status: ConfirmationStatus.CONFIRMED,
      },
      {
        user: {
          id: 'eb61525a-ca62-43f5-bf3d-dcf6125f4ba0',
          name: 'Pedro12',
          email: 'pedro12@test.com',

          image:
            'https://res.cloudinary.com/dl2gtzbk4/image/upload/v1712746488/o8tnzhjlqcgygdkglep9.png',
        },
        status: ConfirmationStatus.DECLINED,
      },
      {
        user: {
          id: '52a4fbd1-a687-4276-8732-713df4bc22c5',
          name: 'Test 3',
          email: 'test3@test.com',

          image:
            'https://res.cloudinary.com/dl2gtzbk4/image/upload/v1712746611/prrkrocyadviwe73hzdb.png',
        },
        status: ConfirmationStatus.PENDING,
      },
      {
        user: {
          id: '56d57d9a-7bb9-4617-9633-45cf1ecbf33f',
          name: 'Test 1',
          email: '',

          image:
            'https://res.cloudinary.com/dl2gtzbk4/image/upload/v1712746640/c9iambjbqx10tu5wqgnn.png',
        },
        status: ConfirmationStatus.PENDING,
      },
      {
        user: {
          id: '584fc23f-122d-4807-8b4b-a870bcbb22b2',
          name: 'Test 5',
          email: '',

          image:
            'https://res.cloudinary.com/dl2gtzbk4/image/upload/v1712993088/h8l2p28usqwo1ms0cvon.png',
        },
        status: ConfirmationStatus.PENDING,
      },
      {
        user: {
          id: 'a99eb77b-f6b4-4f26-a711-6379bb443e22',
          name: 'Sergio',
          email: '',

          image:
            'https://res.cloudinary.com/dl2gtzbk4/image/upload/v1713090355/default/whenzkzy1sn9dn3knfzv.png',
        },
        status: ConfirmationStatus.PENDING,
      },
      {
        user: {
          id: '3202fa3a-65e2-4c2d-a358-8bb3beea96b8',
          name: 'Test 6',
          email: '',

          image:
            'https://res.cloudinary.com/dl2gtzbk4/image/upload/v1712994516/users/ihivww9fyx5wvf9smjns.png',
        },
        status: ConfirmationStatus.PENDING,
      },
    ],
    start_hour: new Date('2024-04-17T16:00:00.000Z'),
    end_hour: new Date('2024-04-17T17:00:00.000Z'),
    meetingRoom: {
      id: '1344428e-52a6-4cae-b684-cb6d2ba15cdd',
      name: 'Sala de juntas 2',
      image:
        'https://www.wework.com/ideas/wp-content/uploads/sites/4/2021/08/20201008-199WaterSt-2_v1-scaled.jpg',
      location: {
        id: 'f8a4fbd1-a687-4276-8732-713df4bc22c5',
        name: 'Sede Centro',
        address: 'Av. asdasd Colonia Centro',
        image:
          'https://assets.devx.work/images/external/blog/corporate_office_building/dfl_epitome.jpg',
      },
    },
    user: {
      id: '40780b1a-0a49-4c32-82af-f4b6b902b18c',
      name: 'Test 1',
      email: '',

      image:
        'https://res.cloudinary.com/dl2gtzbk4/image/upload/v1712742514/msliga8m0yxayzqegzkx.png',
    },
  };

  onSubmit() {
    this.isLoading = true;

    setTimeout(() => {
      const body: Appointment = {
        title: this.appointment.title!,
        description: this.appointment.description!,
        responsible: this.appointment.responsible!,
        start_hour: this.appointment.start_hour,
        end_hour: this.appointment.end_hour,
        meetingRoom: this.appointment.meetingRoom,
        invited: [
          {
            user: this.authService.currentUser()!,
            status: ConfirmationStatus.CONFIRMED,
          },
          ...this.appointment.invited.map((invited) => ({
            user: invited.user,
            status: ConfirmationStatus.PENDING,
          })),
        ],
        user: this.appointment.user,
        // user: this.authService.currentUser()!,
      };

      this.appointmentService.create(body).subscribe({
        next: (response: AppointmentResponse) => {
          this.showMessage('success', 'Success', response.message);
          this.schedulerService.currentStep.set(0);
          this.router.navigate(['/dashboard']);
        },
        error: (e) => {
          this.showMessage('error', 'Error', e.error.message);
        },
      });

      this.isLoading = false;
    }, 1000);
  }

  onCancel() {
    this.schedulerService.currentStep.set(0);
    this.schedulerService.selectedLocation.set({});
    this.schedulerService.selectedMeetingRoom.set({});
    this.schedulerService.selectedStartHour.set('' as any);
    this.schedulerService.currentAppointment().title = '';
    this.schedulerService.currentAppointment().description = '';
    this.schedulerService.currentAppointment().responsible = '';
    this.showMessage('info', 'Info', 'Appointment canceled');
  }

  showMessage(severity: string, summary: string, message: string | string[]) {
    let detail: string;

    if (message.length) {
      detail = message[0] as string;
    } else {
      detail = message as string;
    }

    this.messageService.add({
      severity,
      summary,
      detail,
    });
  }
}
