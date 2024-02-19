import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../models/user';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  isLoading = true;
  userList: User[] = [];
  displayedColumns: string[] = ['name', 'email', 'website'];
  error: any;

  constructor(private data: UserService, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.data.getUsers().subscribe({
      next: (data: User[]) => {
        this.isLoading = false;
        this.userList = data;
      },
      error: (err) => {
        this.isLoading = false;
        this._snackBar.open(err);
        this.error = err;
        console.log(err);
      },
    });
  }
}
