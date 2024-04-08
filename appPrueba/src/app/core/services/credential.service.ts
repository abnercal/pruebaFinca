import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { CredentialItem } from '../models/credential';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CredentialService {

    public API_URL = environment.root;

  constructor(private http: HttpClient, public router: Router, private _snackBar: MatSnackBar) {
  }

  // Service to Send Credentials
  sendCredentials(credentials: CredentialItem): any {
    const url = this.API_URL + 'credential';
    return this.http.put(url, credentials).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((err, caught) => {
        sessionStorage.removeItem('key'); 
        sessionStorage.removeItem('shared_secret');
        this._snackBar.open('Ocurrio un error: ' + err.error.message + " ErrorCode: " + err.status,'',{duration: 2000});
        return throwError(err);
      })
    );
  }
}
