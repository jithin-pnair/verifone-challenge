import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestUtils } from 'src/app/TestUtils';

import { AddToFavouriteComponent } from './add-to-favourite.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { imagesMockData } from '../../../images-mock-data';

import * as imageReducer from '../../../store/reducers/searchImage.reducer';
import { MemoizedSelector } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

describe('AddToFavouriteComponent', () => {
  let component: AddToFavouriteComponent;
  let fixture: ComponentFixture<AddToFavouriteComponent>;
  let testUtils: TestUtils;

  let mockStore: MockStore;
  let mockGetCollection: MemoizedSelector<imageReducer.AppState, string>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        StoreModule.forRoot({})
      ],
      declarations: [AddToFavouriteComponent],
      providers: [
        { provide: MatDialogRef, useValue: [] },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        provideMockStore()
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToFavouriteComponent);
    testUtils = new TestUtils(fixture);
    mockStore = TestBed.inject(MockStore);
    mockGetCollection = mockStore.overrideSelector(
      imageReducer.getCollection,
      ''
    );
    component = fixture.componentInstance;
    component.data = imagesMockData.results[0]
    fixture.detectChanges();

  });

  it('Default Create collection button shows', () => {
    expect(component.createCollection).toBeTrue();
  });

  it('After Create collection button clicks Form will enable to create collection', () => {
    testUtils.clickButton('.borderdot');
    expect(component.createCollection).toBeFalse();
  });

  it('Before enter Collection name Create button should be disabled', () => {
    testUtils.clickButton('.borderdot');
    const flag = testUtils.isDisabled('#createCollectionBtn');
    expect(flag).toBeTrue();
  });


});
