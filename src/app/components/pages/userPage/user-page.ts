import { Component, inject } from '@angular/core';
import { UserService } from '../../../services/user-service';
import { Subscription } from 'rxjs';
import { UserResponse } from '../../../models/response/user-response';
import { PageModel } from '../../../models/PageModel';
import { UserInsertRequest } from '../../../models/request/user-insert-request';
import { AlertService } from '../../../services/AlertService';
import { UserUpdateRequest } from '../../../models/request/user-update-request';
import { DetailDialogComponent } from '../../ui/detail-dialog/detail-dialog';
import { FormsModule } from '@angular/forms';
import { TgmButtonComponent } from '../../ui/tgm-button/tgm-button';
import { ImageUploadComponent } from '../../ui/image-upload-component/image-upload-component';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../ui/table-component/table-component';

@Component({
  selector: 'user-page',
  templateUrl: './user-page.html',
  styleUrl: './user-page.scss',
  imports: [
    TableComponent,
    DetailDialogComponent,
    CommonModule,
    FormsModule,
    ImageUploadComponent,
    TgmButtonComponent,
  ],
})
export class UserPage {
  userService = inject(UserService);
  subscription!: Subscription;

  usersPage!: PageModel<UserResponse>;
  columns: string[] = [
    'id',
    'username',
    'email',
    'firstName',
    'lastName',
    'phone',
    'profilePicture',
    'role',
  ];

  userToCreate: UserInsertRequest = {
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    profilePicture: '',
    profilePictureName: '',
    role: '',
  };

  detailedUser!: UserResponse;
  detaildetailDialogOpen: boolean = false;
  creationDialogOpen: boolean = false;

  alertService = inject(AlertService);

  ngOnInit() {
    this.loadUsers();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  setImage(ImageModel: { image: string; imageName: string }) {
    this.detailedUser.profilePicture = ImageModel.image;
    this.detailedUser.profilePictureName = ImageModel.imageName;
  }

  setImageInsert(ImageModel: { image: string; imageName: string }) {
    this.userToCreate.profilePicture = ImageModel.image;
    this.userToCreate.profilePictureName = ImageModel.imageName;
  }

  loadUsers() {
    this.subscription = this.userService.getUsers().subscribe({
      next: (data) => {
        data.data.map((element) => {
          element.profilePicture = element.profilePicture
            ? element.profilePicture
            : 'assets/product-no-image.svg';
        });
        console.log('Users loaded:', data);
        this.usersPage = data;
      },
      error: (error) => {
        this.alertService.error({
          title: 'Error',
          text: 'Failed to load users. Please try again later.',
        });
        console.error('Error fetching users:', error);
      },
    });
  }

  openItemDetail(id: number) {
    console.log('User ID clicked:', id);
    this.getUser(id);
    this.detaildetailDialogOpen = true;
  }

  openCreationDialog() {
    console.log('Entrando en creacion de usuario');
    this.creationDialogOpen = true;
  }

  getUser(id: number) {
    return this.userService.getUser(id).subscribe({
      next: (data) => {
        this.detailedUser = data;
      },
      error: (error) => {
        this.alertService.error({
          title: 'Error',
          text: 'Failed to load user details. Please try again later.',
        });
        console.error('Error fetching user details:', error);
      },
    });
  }

  closeDialog() {
    this.detaildetailDialogOpen = false;
    this.creationDialogOpen = false;
  }

  createUser() {
    console.log(this.userToCreate);

    let newUser: UserInsertRequest = {
      username: this.userToCreate.username,
      password: this.userToCreate.password,
      email: this.userToCreate.email,
      firstName: this.userToCreate.firstName,
      lastName: this.userToCreate.lastName,
      phone: this.userToCreate.phone,
      profilePicture: this.userToCreate.profilePicture.split(',')[1],
      profilePictureName: this.userToCreate.profilePictureName,
      role: this.userToCreate.role,
    };
    console.log('Creating user:', newUser);
    this.userService.createUser(newUser).subscribe({
      next: (data) => {
        this.alertService.success({
          title: 'User Created',
          text: 'The user has been successfully created.',
        });
        this.loadUsers();
      },
      error: (error) => {
        this.alertService.error({
          title: 'Error',
          text: 'Failed to create user. Please try again later.',
        });
        console.error('Error creating user:', error);
      },
    });
    this.closeDialog();
  }

  updateUser() {
    console.log('User:', this.detailedUser);
    if (this.detailedUser) {
      let updatedUser: UserUpdateRequest = {
        id: this.detailedUser.id,
        username: this.detailedUser.username,
        email: this.detailedUser.email,
        firstName: this.detailedUser.firstName,
        lastName: this.detailedUser.lastName,
        phone: this.detailedUser.phone,
        profilePicture:
          this.detailedUser.profilePicture.split(',')[1] || this.detailedUser.profilePicture,
        profilePictureName: this.detailedUser.profilePictureName,
        role: this.detailedUser.role,
      };
      console.log('Updating user:', this.detailedUser);
      this.userService.updateUser(this.detailedUser.id, updatedUser).subscribe({
        next: (data) => {
          this.loadUsers();
        },
        error: (error) => {
          this.alertService.error({
            title: 'Error',
            text: 'Failed to update user. Please try again later.',
          });
          console.error('Error updating user:', error);
        },
      });
      this.closeDialog();
    }
  }

  deleteUser() {
    this.userService.deleteUserById(this.detailedUser.id).subscribe({
      next: () => {
        this.alertService.success({
          title: 'User Deleted',
          text: 'The user has been successfully deleted.',
        });
        this.closeDialog();
        this.loadUsers();
      },
      error: (error) => {
        console.error('Error deleting user:', error);
        this.alertService.error({
          title: 'Error',
          text: 'Failed to delete user. Please try again later.',
        });
      },
    });
  }
}
