import { TestBed, async, ComponentFixture, getTestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SpinnerService } from './services/spinner.service';
import { TestUtils } from './TestUtils';

let testUtils: TestUtils;
let fixture: ComponentFixture<AppComponent>;
let spinnerService: SpinnerService;
let injector: TestBed;

const config = {
  declarations: [AppComponent]
};

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule(config).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    testUtils = new TestUtils(fixture);
    injector = getTestBed();
    // tslint:disable-next-line: deprecation
    spinnerService = injector.get(SpinnerService);
  }));

  it('should create the app component', () => {
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

});
