/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';


/**
 * Operations about users
 */
@Injectable({
  providedIn: 'root',
})
class UsersService extends __BaseService {
  static readonly postApiV1UsersAuthenticatePath = '/api/v1/users/authenticate';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Authenticate
   * @param params The `UsersService.PostApiV1UsersAuthenticateParams` containing the following parameters:
   *
   * - `password`: Password
   *
   * - `email`: Email
   */
  postApiV1UsersAuthenticateResponse(params: UsersService.PostApiV1UsersAuthenticateParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let __formData = new FormData();
    __body = __formData;
    if (params.password != null) { __formData.append('password', params.password as string | Blob);}
    if (params.email != null) { __formData.append('email', params.email as string | Blob);}
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/v1/users/authenticate`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Authenticate
   * @param params The `UsersService.PostApiV1UsersAuthenticateParams` containing the following parameters:
   *
   * - `password`: Password
   *
   * - `email`: Email
   */
  postApiV1UsersAuthenticate(params: UsersService.PostApiV1UsersAuthenticateParams): __Observable<null> {
    return this.postApiV1UsersAuthenticateResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module UsersService {

  /**
   * Parameters for postApiV1UsersAuthenticate
   */
  export interface PostApiV1UsersAuthenticateParams {

    /**
     * Password
     */
    password: string;

    /**
     * Email
     */
    email: string;
  }
}

export { UsersService }
