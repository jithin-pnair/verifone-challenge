
import { Action } from '@ngrx/store';
import { ImageModel } from './../models/image.model'
import { collectionModel } from '../models/collection.model';


export enum ImageActionTypes {
    LOAD_IMAGES = "[Image] Load Images",
    LOAD_IMAGES_SUCCESS = "[Image] Load Images Success",
    LOAD_IMAGES_FAIL = "[Image] Load Images Fail",
    CREATE_COLLECTION = '[Image] create Collection',
    ADD_IMAGE_TO_COLLECTION = '[Image] Add to collection',
    REMOVE_IMAGE_FROM_COLLECTION = '[Image] Remove from collection',
    DELETE_COLLECTION = '[Collection] Delete collection',
    UPDATE_COLLECTION = '[Collection] update collection'

}

export class LoadImages implements Action {
    readonly type = ImageActionTypes.LOAD_IMAGES;
    constructor(public payload: string, public pageIndex: number, public pageSize: number) {
        console.log(payload);
    }
}

export class LoadImagesSuccess implements Action {
    readonly type = ImageActionTypes.LOAD_IMAGES_SUCCESS;
    constructor(public payload: ImageModel[]) { }
}

export class LoadImagesFail implements Action {
    readonly type = ImageActionTypes.LOAD_IMAGES_FAIL;
    constructor(public payload: string) { }
}

export class AddToCollection implements Action {
    public type = ImageActionTypes.ADD_IMAGE_TO_COLLECTION;
    constructor(public payload: any, public name: string) { }
}

export class createCollection implements Action {
    readonly type = ImageActionTypes.CREATE_COLLECTION;
    constructor(public payload: any) { }
}

export class RemoveFromCollection implements Action {
    readonly type = ImageActionTypes.REMOVE_IMAGE_FROM_COLLECTION;
    constructor(public payload: string, public name: string) { }
}

export class DeleteCollection implements Action {
    readonly type = ImageActionTypes.DELETE_COLLECTION;
    constructor(public payload: string) { }
}

export class UpdateCollection implements Action {
    readonly type = ImageActionTypes.UPDATE_COLLECTION;
    constructor(public payload: object) { }
}

export type Actions = LoadImages | LoadImagesSuccess | LoadImagesFail | createCollection | AddToCollection | RemoveFromCollection | DeleteCollection | UpdateCollection;
