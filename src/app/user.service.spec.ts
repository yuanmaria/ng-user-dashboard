import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
      imports: [HttpClientTestingModule, HttpClientModule],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UserService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get users', () => {
    service.getUsers().subscribe(() => []);
    const req = httpTestingController.expectOne("https://jsonplaceholder.typicode.com/users");
    expect(req.request.method).toEqual('GET');
    req.flush({});
  });

  it('should get user detail', () => {
    service.getUser("1").subscribe(() => {});
    const req = httpTestingController.expectOne("https://jsonplaceholder.typicode.com/users/1");
    expect(req.request.method).toEqual('GET');
    req.flush({});
  });
});
