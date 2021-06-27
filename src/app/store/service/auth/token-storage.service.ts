import { Injectable } from '@angular/core';
import { sessionStorageKeys } from '../../../../environments/session-storage-manager';

const TOKEN_KEY = sessionStorageKeys.TOKEN_KEY;
const USERNAME_KEY = sessionStorageKeys.USERNAME_KEY;
const AUTHORITIES_KEY = sessionStorageKeys.AUTHORITIES_KEY;

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  private role: string | undefined;
  constructor() {}

  signOut() {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(AUTHORITIES_KEY);
    sessionStorage.removeItem(USERNAME_KEY);
  }

  public saveToken(token: string) {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY) as string;
  }

  public saveUsername(username: string) {
    sessionStorage.removeItem(USERNAME_KEY);
    sessionStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY) as string;
  }

  public saveAuthorities(authority: string) {
    sessionStorage.removeItem(AUTHORITIES_KEY);
    sessionStorage.setItem(AUTHORITIES_KEY, authority);
  }

  public getAuthorities(): string {
    let res = sessionStorage.getItem(AUTHORITIES_KEY);
    if (res) {
      return res;
    }
    return '';
  }

  public isAuthorised(): boolean {
    return (
      sessionStorage.getItem(TOKEN_KEY) !== null &&
      sessionStorage.getItem(TOKEN_KEY) !== ''
    );
  }
}
