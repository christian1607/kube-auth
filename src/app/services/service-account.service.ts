import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import { ServiceAccount } from '../model/service-account';
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

  deleteServiceAccount(name: string,namespace:string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(API_BASE+'/api/v1/namespaces/'+namespace+'/serviceaccounts/'+name,
      {headers,observe: 'response'}
      );
  }

  createServiceAccount(sa: ServiceAccount): Observable<HttpResponse<ServiceAccount>> {
    return this.http.post<ServiceAccount>(API_BASE+'/api/v1/serviceaccounts',
        sa,
        {headers,observe: 'response'}
      );
  }

  updateServiceAccount(sa: ServiceAccount): Observable<HttpResponse<ServiceAccount>> {
    return this.http.put<ServiceAccount>(API_BASE+'/api/v1/namespaces/'+sa.metadata.namespace+'/serviceaccounts/'+sa.metadata.name,
        sa,
        {headers,observe: 'response'}
      );
  }

}
