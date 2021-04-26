import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }


  getUsers(username): Observable<any> {
    if (username) {
      return this.http.get('https://api.unsplash.com/users/' + username.user.username);
    }
  }

  getPhotosLink(link): any {
    if (link) {
      return this.http.get(link,
        { headers: { Authorization: 'Client-ID -tg5EuXH7ZwvsJIZt5Hh3w6IaMejDyV1As1NPg_vMWE' } });
    }
  }

  getLikesLink(link): any {
    if (link) {
      return this.http.get(link,
        { headers: { Authorization: 'Client-ID -tg5EuXH7ZwvsJIZt5Hh3w6IaMejDyV1As1NPg_vMWE' } });
    }
  }
  getCollectionsLink(link): any {
    if (link) {
      return this.http.get(link,
        { headers: { Authorization: 'Client-ID -tg5EuXH7ZwvsJIZt5Hh3w6IaMejDyV1As1NPg_vMWE' } });
    }
  }


  getUserCollections(username): any {
    if (username) {
      return this.http.get('https://api.unsplash.com/users/' + username.user.username + '/collections',
        { headers: { Authorization: 'Client-ID -tg5EuXH7ZwvsJIZt5Hh3w6IaMejDyV1As1NPg_vMWE' } });
    }
  }
}
