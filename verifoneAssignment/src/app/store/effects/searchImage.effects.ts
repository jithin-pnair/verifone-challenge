import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as imageActions from '../../store/actions/searchImage.actions';
import { ImageModel } from '../../store/models/image.model';
import { SearchImageService } from 'src/app/services/main/search-image/search-image.service';

@Injectable()
export class ImageEffect {
    constructor(private actions$: Actions,
        private searchImageSrv: SearchImageService
    ) { }

    @Effect()
    AddImage$: Observable<Action> = this.actions$.pipe(
        ofType<imageActions.LoadImages>(
            imageActions.ImageActionTypes.LOAD_IMAGES
        ),
        mergeMap((actions: imageActions.LoadImages) =>
            this.searchImageSrv.getImageList(actions.payload, actions.pageIndex, actions.pageSize).pipe(
                map(
                    (images: ImageModel[]) =>
                        new imageActions.LoadImagesSuccess(images)
                ),
                catchError(err => of(new imageActions.LoadImagesFail(err)))
            )
        )
    )
}

