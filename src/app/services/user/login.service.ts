import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {UsersService} from "../../modules/retail-api/generated/services/users.service";

export class User {
    username: string;
    password: string;
    token?: string
}
export class UserLoggedIn {
    user: object;
    token: string;
    role: string;
}
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
              private usersService: UsersService) { }

  login(user): Observable<any> {
    return this.usersService.postApiV1UsersAuthenticate(user)
        .pipe( // mergeMap
            // wait for promise to resolve, then return resolved result
            mergeMap(response => {
              return this.makeUser(response); // returns a Promise
            })
        );
  }

  private makeUser(user): Promise<any> {
      return Promise.resolve(user.user)
  }
}
