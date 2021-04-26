import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { NavComponent } from './nav.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TestUtils } from './../../TestUtils';

let testUtils: TestUtils;
let fixture: ComponentFixture<NavComponent>;

const config = {
  imports: [RouterTestingModule, MatMenuModule],
  declarations: [NavComponent]
};

describe('NavComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule(config).compileComponents();
    fixture = TestBed.createComponent(NavComponent);
    fixture.detectChanges();
    testUtils = new TestUtils(fixture);

  });

  it('To search Text box should be there', () => {
    const textField = testUtils.getStyleProperties('div form input');
    expect(textField).toBeDefined();
  });

  it('Search box should be an place holder [Search Images]', () => {
    const placeholder = testUtils.getAttributeValue('div form input', 'placeholder');
    expect(placeholder).toBe('Search Images');
  });

  it('Home page link should be there', () => {
    const home = testUtils.getStyleProperties('.homeDiv');
    expect(home).toBeDefined();
  });

  it('Menu link should be there to redirect to favorite page', () => {
    const menu = testUtils.getStyleProperties('mat-menu');
    expect(menu).toBeDefined();
  });

});
