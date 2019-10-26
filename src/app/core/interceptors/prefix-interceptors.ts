import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { isPlatformBrowser } from "@angular/common";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class PrefixInterceptor implements HttpInterceptor {
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const modified = req.clone({
      setHeaders: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    });

    return next.handle(modified);
  }
}
