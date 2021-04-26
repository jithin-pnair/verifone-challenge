import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestUtils } from 'src/app/TestUtils';
import { imagesMockData } from 'src/app/images-mock-data';
import { of } from 'rxjs';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

import { SearchImageService } from '../../services/main/search-image/search-image.service';
import { SearchImageComponent } from './search-image.component';

let component: SearchImageComponent;
let fixture: ComponentFixture<SearchImageComponent>;
let searchImageService: SearchImageService;
let testUtils: TestUtils;
let injector: TestBed;

const config = {
  imports: [HttpClientTestingModule, MatDialogModule, RouterTestingModule],
  declarations: [SearchImageComponent],
  providers: [{ provide: MatDialogRef, useValue: [] }]
};

describe('SearchImageComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule(config).compileComponents();
    fixture = TestBed.createComponent(SearchImageComponent);
    fixture.detectChanges();
    testUtils = new TestUtils(fixture);
    injector = getTestBed();
    searchImageService = injector.inject(SearchImageService);
  });

  it('should create search image component', () => {
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it(`When there is no result then it should print 'No records found'`, () => {
    component = fixture.componentInstance;
    spyOn(searchImageService, 'getImageList').and.returnValue(of(
      { total: 0, total_pages: 0, results: [] }
    ));
    component.searchImages('');
    expect(component.noResultsFound).toBeTrue();
  });

  it(`When there is no result then image list should be zero`, () => {
    component = fixture.componentInstance;
    spyOn(searchImageService, 'getImageList').and.returnValue(of(
      { total: 0, total_pages: 0, results: [] }
    ));
    component.searchImages('');
    expect(component.searchedImages.length).toEqual(0);
  });

  it('When result comes from API data should be found', () => {
    component = fixture.componentInstance;
    spyOn(searchImageService, 'getImageList').and.returnValue(of(imagesMockData));
    component.searchImages('nature');
    expect(component.noResultsFound).toBeFalse();
  });


});
