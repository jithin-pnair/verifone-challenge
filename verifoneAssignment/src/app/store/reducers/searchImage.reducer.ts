import * as imageActions from '../actions/searchImage.actions';
import { ImageModel } from '../models/image.model';
import * as fromRoot from '../../state/app-state';
import { createSelector, createFeatureSelector } from '@ngrx/store'
import { collectionModel } from '../models/collection.model';
import { isNgTemplate } from '@angular/compiler';
import { act } from '@ngrx/effects';

export interface ImageSate {
    results: ImageModel[];
    collections: any;
    loading: boolean;
    loaded: boolean;
    error: string;
}

export interface AppState extends fromRoot.AppState {
    imageSearchResult: ImageSate
}

export const initialState: ImageSate = {
    results: [],
    collections: [],
    loading: false,
    loaded: true,
    error: ""
};

export function ImageReducer(
    state = initialState,
    action: imageActions.Actions
): ImageSate {
    switch (action.type) {
        case imageActions.ImageActionTypes.LOAD_IMAGES: {
            return {
                ...state,
                loading: true
            }
        }
        case imageActions.ImageActionTypes.LOAD_IMAGES_SUCCESS: {
            return {
                ...state,
                loading: false,
                loaded: true,
                results: action.payload
            }
        }
        case imageActions.ImageActionTypes.LOAD_IMAGES_FAIL: {
            return {
                ...state,
                results: [],
                loading: false,
                loaded: false,
                error: action.payload
            }
        }

        case imageActions.ImageActionTypes.CREATE_COLLECTION: {
            return {
                ...state,
                collections: [...state.collections, action.payload]
            };
        }
        case imageActions.ImageActionTypes.ADD_IMAGE_TO_COLLECTION: {
            var index = state.collections.findIndex(item => item.name === action.name);
            var imageData = [...state.collections[index].imageArray];
            imageData = [...imageData, action.payload];
            var condition = { ...state.collections[index], imageArray: imageData };
            var temp = [...state.collections];
            temp[index] = condition;

            return {
                ...state,
                collections: temp
            }
        }
        case imageActions.ImageActionTypes.DELETE_COLLECTION: {
            return {
                ...state,
                collections: [...state.collections.filter(item => item.name !== action.payload)]
            };
        }

        case imageActions.ImageActionTypes.UPDATE_COLLECTION: {
            return {
                ...state,
                collections: [...state.collections.map((item: any) => {
                    if (item.name === action.payload.existingName) {
                        return { ...item, name: action.payload.updatedName, desc: action.payload.desc }
                    } else {
                        return item
                    }
                })]
            }
        }

        case imageActions.ImageActionTypes.REMOVE_IMAGE_FROM_COLLECTION: {
            return {
                ...state,
                collections: [...state.collections.map((item: any) => {
                    if (item.name === action.payload) {
                        let data = item.imageArray.filter((val: any) => val.id !== action.name)
                        return { ...item, imageArray: data }
                    } else {
                        return item
                    }
                })]
            }
        }

        default:
            return state;
    }
}

const getImageFeatureState = createFeatureSelector<ImageSate>('imageSearchResult')

export const getImages = createSelector(
    getImageFeatureState,
    (state: ImageSate) => state.results
)
export const getImagesLoading = createSelector(
    getImageFeatureState,
    (state: ImageSate) => state.loading
)

export const getImagesLoaded = createSelector(
    getImageFeatureState,
    (state: ImageSate) => state.loaded
)

export const getImagesError = createSelector(
    getImageFeatureState,
    (state: ImageSate) => state.error
)

export const getCollection = createSelector(
    getImageFeatureState,
    (state: ImageSate) => state.collections
)



