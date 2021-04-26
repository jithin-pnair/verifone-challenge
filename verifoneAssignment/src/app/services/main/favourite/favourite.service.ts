import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  dataUrl: any = 'assets/image.json';
  data: any;
  //pictureCollection = new BehaviorSubject(this.data);
  constructor(private httpClient: HttpClient) { }


  getImages(): any {
    return this.httpClient.get<any>(this.dataUrl);
  }

  getUserCollections(): any {
      return this.httpClient.get('https://api.unsplash.com/users/' + 'harleydavidson' + '/collections',
        { headers: { Authorization: 'Client-ID -tg5EuXH7ZwvsJIZt5Hh3w6IaMejDyV1As1NPg_vMWE' } });
  }

  }

