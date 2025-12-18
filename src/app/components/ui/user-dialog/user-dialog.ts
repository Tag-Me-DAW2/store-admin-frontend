import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../input-component/input-component';
import { ImageUploadComponent } from '../image-upload-component/image-upload-component';
import { TgmButtonComponent } from '../tgm-button/tgm-button';
import { UserUpdateRequest } from '../../../models/request/user-update-request';
import { UserService } from '../../../services/user-service';

@Component({
  selector: 'tgm-user-dialog',
  templateUrl: './user-dialog.html',
  styleUrls: ['./user-dialog.scss'],
  imports: [FormsModule, InputComponent, ImageUploadComponent, TgmButtonComponent],
})
export class UserDialogComponent {
  user = JSON.parse(localStorage.getItem('user') || '{}');
  @Output() userDialog: EventEmitter<boolean> = new EventEmitter<boolean>();
  userImageBase64: string = '';
  userImageName: string = '';
  usertToUpdate!: UserUpdateRequest;
  userService = inject(UserService);

  onImageBase64(ImageModel: { image: string; imageName: string }) {
    this.userImageBase64 = ImageModel.image;
    this.userImageName = ImageModel.imageName;
  }

  closeDialog() {
    this.userDialog.emit(false);
  }

  updateUser() {
    this.usertToUpdate = {
      id: this.user.id,
      username: this.user.username,
      email: this.user.email,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      phone: this.user.phone,
      profilePicture: this.userImageBase64.split(',')[1] || this.user.profilePicture,
      profilePictureName: this.userImageName || this.user.profilePictureName,
      role: this.user.role,
    };

    this.userService.updateUser(this.user.id, this.usertToUpdate);
    this.closeDialog();
  }
}
