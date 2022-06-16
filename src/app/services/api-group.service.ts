import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AppComponent } from '../app.component';
import { ApiGroupList } from '../model/api-group-list';
import { ApiResourceList } from '../model/api-resource-list';

const API_BASE=AppComponent.apiServerUrl


@Injectable({
  providedIn: 'root'
})
export class ApiGroupService {

  constructor(private http:HttpClient) { 

  }

  listApis(): Observable<HttpResponse<ApiGroupList>> {

    return this.http.get<ApiGroupList>(AppComponent.apiServerUrl+'/apis/',
        {observe: 'response'}
      );
  }


  listApisConnectivity(url:string, token:string): Observable<HttpResponse<ApiGroupList>> {

    var httpHeader = new HttpHeaders()
        .set("Authorization", "Bearer "+ token)

    return this.http.get<ApiGroupList>(url+'/apis/',{headers:httpHeader ,observe: 'response'});
  }

  listResources(groupVersion: string): Observable<HttpResponse<ApiResourceList>> {

    return this.http.get<ApiResourceList>(AppComponent.apiServerUrl+'/apis/'+groupVersion,{observe: 'response'});
  }

  listResourcesV1(): Observable<HttpResponse<ApiResourceList>> {

    return this.http.get<ApiResourceList>(AppComponent.apiServerUrl+'/api/v1',{observe: 'response'});
  }
}
