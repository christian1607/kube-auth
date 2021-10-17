import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import { ServiceAccountList } from '../model/service-account-list';

const API_BASE=environment.API_BASE
const headers = environment.headers

@Injectable({
  providedIn: 'root'
})
export class ServiceAccountService {

  constructor(private http:HttpClient) { 

  }

  listServiceAccount(): Observable<HttpResponse<ServiceAccountList>> {
    return this.http.get<ServiceAccountList>(API_BASE+'/api/v1/serviceaccounts',
        {headers,observe: 'response'}
      );
  }

  listServiceAccountByNamespace(namespace:string): Observable<HttpResponse<ServiceAccountList>> {
    return this.http.get<ServiceAccountList>(API_BASE+'/api/v1/namespaces/'+namespace+'/serviceaccounts',
        {headers,observe: 'response'}
      );
  }
}
