import {Inject, Injectable} from '@angular/core';
import {ServiceModule} from "../service.module";
import {HttpClient, HttpParams} from "@angular/common/http";
import {API_CONFIG} from "../../core/inject-tokens";
import { Observable, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import queryString from 'query-string';
import { User } from '../data-modals/member.models';
import { LoginParams } from 'src/app/share/wy-ui/wy-layer/wy-login-phone/wy-login-phone.component';
export type SignBack = {
  point: number;
  code: number;
}

@Injectable({
  providedIn: ServiceModule
})
export class MemberService {
  constructor(private http: HttpClient, @Inject(API_CONFIG) private config: string) {}

  // 签到/daily_signin
  signIn(): Observable<SignBack | Observable<never>> {
    const params = new HttpParams({fromString: queryString.stringify({ type: 1 })});
    return this.http.get(this.config + 'daily_signin', { params })
    .pipe(map((res: { code: number; point?: number; msg?: string; }) => {
      if (res.code === 200) {
        return res as SignBack;
      }else{
        return throwError(res);
      }
    }));
  }

  login(values: LoginParams): Observable<User> {
    const params = new HttpParams({fromString: queryString.stringify(values)});
    return this.http.get(this.config + 'login/cellphone', { params })
    .pipe(switchMap((res: User) => this.userDetail(res.profile.userId)));
  }

  userDetail(uid: number): Observable<User> {
    const params = new HttpParams({fromString: queryString.stringify({ uid })});
    return this.http.get(this.config + 'user/detail', { params })
    .pipe(map(res => res as User));
  }
}