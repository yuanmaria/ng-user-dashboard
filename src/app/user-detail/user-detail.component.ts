import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  userDetail!: User;
  userId = '';
  isLoading = true;
  error: any;

  constructor(private data: UserService, private route: ActivatedRoute, private _snackBar: MatSnackBar) {
    this.route.params.subscribe((params) => (this.userId = params['id']));
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.userId = params['id'];
      this.data.getUser(this.userId).subscribe({
        next: (data: User) => {
          this.isLoading = false;
          this.userDetail = data;
        },
        error: (err) => {
          this.isLoading = false;
          this._snackBar.open(err);
          console.log(err);
          this.error = err;
        },
      });
    });
  }
}
