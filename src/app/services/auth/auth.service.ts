import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  role;
  constructor() { }

  isAuthenticated() {
    const user = localStorage.getItem('currentUser')
    const token = localStorage.getItem('token')
    if(user != 'undefined') {
      let currentUser = JSON.parse(user);
      if (currentUser !== null && token !== null) {
        return !!(currentUser && token);
      } else {
        return false
      }
    }
    return false
  }
}
