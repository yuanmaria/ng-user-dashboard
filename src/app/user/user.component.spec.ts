import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UserComponent } from './user.component';
import { UserService } from '../user.service';
import { of, throwError } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  
  beforeEach(waitForAsync(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers']);

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

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    userServiceSpy.getUsers.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('when user service is called', () => {
      userServiceSpy.getUsers.and.returnValue(of([]));

      component.ngOnInit();
      expect(component.userList).toEqual([]);
    });

    it('when user service throw error', () => {
      const error = new Error('mock error'); 
      userServiceSpy.getUsers.and.returnValue(
        throwError(()=> error)
      );

      component.ngOnInit();
      expect(component.userList).toEqual([]);
      expect(component.error).toEqual(error);
    });
  });
});
