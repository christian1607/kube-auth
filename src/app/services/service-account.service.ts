import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import { AppComponent } from '../app.component';
import { ServiceAccount } from '../model/service-account';
import { ServiceAccountList } from '../model/service-account-list';


@Injectable({
  providedIn: 'root'
})
export class ServiceAccountService {

  constructor(private http:HttpClient) { 

  }

  listServiceAccount(): Observable<HttpResponse<ServiceAccountList>> {
    return this.http.get<ServiceAccountList>(AppComponent.apiServerUrl+'/api/v1/serviceaccounts',
        {observe: 'response'}
      );
  }

  listServiceAccountByNamespace(namespace:string): Observable<HttpResponse<ServiceAccountList>> {
    return this.http.get<ServiceAccountList>(AppComponent.apiServerUrl+'/api/v1/namespaces/'+namespace+'/serviceaccounts',
        {observe: 'response'}
      );
  }


  findServiceAccount(name:string , namespace: string): Observable<HttpResponse<ServiceAccount>> {
    return this.http.get<ServiceAccount>(AppComponent.apiServerUrl+'/api/v1/namespaces/'+namespace+'/serviceaccounts/'+name,
        {observe: 'response'}
      );
  }

  deleteServiceAccount(name: string,namespace:string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(AppComponent.apiServerUrl+'/api/v1/namespaces/'+namespace+'/serviceaccounts/'+name,
      {observe: 'response'}
      );
  }

  createServiceAccount(sa: ServiceAccount): Observable<HttpResponse<ServiceAccount>> {
    return this.http.post<ServiceAccount>(AppComponent.apiServerUrl+'/api/v1/namespaces/'+sa.metadata.namespace+'/serviceaccounts',
        sa,
        {observe: 'response'}
      );
  }

  updateServiceAccount(sa: ServiceAccount): Observable<HttpResponse<ServiceAccount>> {
    return this.http.put<ServiceAccount>(AppComponent.apiServerUrl+'/api/v1/namespaces/'+sa.metadata.namespace+'/serviceaccounts/'+sa.metadata.name,
        sa,
        {observe: 'response'}
      );
  }

}
