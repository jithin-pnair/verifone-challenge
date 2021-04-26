import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';

import { AuthorComponent } from './author.component';
import { AuthorService } from '../../services/main/author/author.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { TestUtils } from 'src/app/TestUtils';
import { authorData } from 'src/app/auth-mock-data/author-mock-data';
import { collectionsMockData } from 'src/app/auth-mock-data/collections-mock-data';

describe('AuthorComponent', () => {
  let component: AuthorComponent;
  let fixture: ComponentFixture<AuthorComponent>;
  let authService: AuthorService;
  let injector: TestBed;
  let testUtils: TestUtils;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AuthorComponent],
      providers: [
        HttpClientModule,
        { provide: ActivatedRoute, useValue: [] },
        { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); } }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorComponent);
    component = fixture.componentInstance;
    component.authorDetails = collectionsMockData;
    component.userDetails = authorData;
    fixture.detectChanges();
    testUtils = new TestUtils(fixture);
    injector = getTestBed();
    authService = injector.inject(AuthorService);
  });

  it('should create author component', () => {
    expect(component).toBeTruthy();
  });

  it('Author picture tag should be there', () => {
    fixture.detectChanges();
    const flag = testUtils.getStyleProperties('.circular_profile');
    expect(flag).toBeDefined();
  });

  it('Author name should display', () => {
    const authourName = testUtils.getStyleProperties('.username');
    expect(authourName).toBeDefined();
  });

  it('Authour location details should display', () => {
    const location = testUtils.getStyleProperties('.userlocation');
    expect(location).toBeDefined();
  });

  it('Author history should display', () => {
    const history = testUtils.getStyleProperties('.historyOfUser');
    expect(history).toBeDefined();
  });

});
