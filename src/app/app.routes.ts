import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

export const routes: Routes = [ {
    path: '',
    component: UserComponent,
  },
  {
    path: 'details/:id',
    component: UserDetailComponent,
  }
];
