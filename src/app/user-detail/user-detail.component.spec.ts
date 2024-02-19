import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserDetailComponent } from './user-detail.component';
import { UserService } from '../user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { User } from '../models/user';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService> ;

  beforeEach(waitForAsync(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['getUser']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    userServiceSpy.getUser.and.returnValue(of({} as User));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('when user service is called', () => {
      userServiceSpy.getUser.and.returnValue(of({name: "tes"} as User));

      component.ngOnInit();
      expect(component.userDetail).toEqual({name: "tes"} as User);
    });

    it('when user service throw error', () => {
      const error = new Error('mock error'); 
      userServiceSpy.getUser.and.returnValue(
        throwError(()=> error)
      );

      component.ngOnInit();
      expect(component.userDetail).toEqual({} as User);
      expect(component.error).toEqual(error);
    });
  });
});
