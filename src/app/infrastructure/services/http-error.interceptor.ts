import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalService } from '@services/global.service';
import { AppText } from '@utils/app-text';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  logoutModalRef!: MatDialogRef<any>;
  constructor(
    private auth: AuthService,
    private _global: GlobalService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(err => {
          if (err instanceof HttpErrorResponse) {
              console.log("HttpErrorResponse error: ", err);
              switch (err.status) {
                  case 401: // Expired or unauthenticated token
                      console.log("******** ERROR 401 ********");

                      if(!this.logoutModalRef){
                        this.logoutModalRef = this._global.showInfo({
                          title: AppText.session_expired,
                          msg: AppText.msg_session_expired
                        });
                      }

                      this.auth.logout();
                      break;
                  case 480: // The version is no longer available
                      console.log("******** ERROR 480 ********");
                      //
                      break;
                  case 481: // The current version is not supported (there is no version number)
                      console.log("******** ERROR 481 ********");
                      //
                      break;
                  case 490: // When a user is unlocked
                      console.log("******** ERROR 490 ********");
                      break;

                  default:
                      break;
              }
          }
          // Here you could add code that shows the error somewhere on the screen.
          return throwError( () => err );
      })
  );
  }
}
