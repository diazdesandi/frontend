import { Component, Input } from '@angular/core';
import { User } from '../../interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userFields } from '../../forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
})
export class UserEditComponent {
  @Input() user: User | null = null;
  @Input() title: string = 'Edit Profile';
  isEditing: boolean = false;

  fields = [
    ...userFields,
    {
      id: 'image',
      type: 'image',
      name: 'image',
      label: 'Image',
      helpText: 'Upload user image',
    },
  ];

  uploadedFile: any;

  profileForm: FormGroup = this.fb.group({
    name: [
      { value: '', disabled: !this.isEditing },
      [Validators.required, Validators.minLength(3)],
    ],
    email: [
      { value: '', disabled: !this.isEditing },
      [Validators.required, Validators.email],
    ],
    password: [
      { value: '', disabled: !this.isEditing },
      [Validators.required, Validators.minLength(6), Validators.maxLength(12)],
    ],
    roles: [{ value: '', disabled: !this.isEditing }, [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (this.user) {
      this.profileForm.patchValue(this.user);
    }
  }

  ngAfterViewInit() {
    console.log(this.user);
  }

  editProfile() {
    this.isEditing = !this.isEditing;
  }

  saveProfile(user: any) {
    console.log(user);
  }

  onSelect(event: any) {
    this.uploadedFile = event.addedFiles[0];
  }
}
