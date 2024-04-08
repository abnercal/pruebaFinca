import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { CredentialItem } from '../models/credential';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageItem } from '../models/message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  public API_URL = environment.root;

  constructor(
    private http: HttpClient,
    public router: Router,
    private _snackBar: MatSnackBar
  ) {}

  // Service to GET Messages
  getAllMessages(): any {
    const url = this.API_URL + 'message';
    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((err, caught) => {
        this._snackBar.open(
          'Ocurrio un error: ' +
            err.error.message +
            ' ErrorCode: ' +
            err.status,
          '',
          { duration: 2000 }
        );
        return throwError(err);
      })
    );
  }

  // Service to POST Message
  sendMessage(message: MessageItem): any {
    const url = this.API_URL + 'message';
    return this.http.post(url, message).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((err, caught) => {
        this._snackBar.open(
          'Ocurrio un error: ' +
            err.error.message +
            ' ErrorCode: ' +
            err.status,
          '',
          { duration: 2000 }
        );
        return throwError(err);
      })
    );
  }

  // Service to Find Message by ID
  findByID(id: string): any {
    const url = this.API_URL + 'message/findID/' + id;
    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((err, caught) => {
        this._snackBar.open(
          'Ocurrio un error: ' +
            err.error.msg +
            ' ErrorCode: ' +
            err.status,
          '',
          { duration: 2000 }
        );
        return throwError(err);
      })
    );
  }

  // Service to Find Message by TAG
  findByTag(tag: string): any {
    const url = this.API_URL + 'message/' + tag;
    return this.http.get(url).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((err, caught) => {
        this._snackBar.open(
          'Ocurrio un error: ' +
            err.error.msg +
            ' ErrorCode: ' +
            err.status,
          '',
          { duration: 2000 }
        );
        return throwError(err);
      })
    );
  }
}
