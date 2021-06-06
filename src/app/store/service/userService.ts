import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = `${environment.url}`;

  constructor(private http: HttpClient) {}

  addUser(user: User) {
    const url = `${this.url}users/add`;
    const body = {
      email: user.email,
      password: user.password,
      name: user.name,
      surname: user.surname,
      role: user.role,
    };
    return this.http.post(url, body).toPromise();
  }

  checkIfEmailExists(email: string) {
    const url = `${this.url}users/check-email/`;
    return this.http.get<boolean>(url + String(email));
  }
}
