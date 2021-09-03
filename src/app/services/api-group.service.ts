import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiGroupList } from '../model/api-group-list';
import { ApiResourceList } from '../model/api-resource-list';

const API_BASE=environment.API_BASE
const headers = environment.headers

@Injectable({
  providedIn: 'root'
})
export class ApiGroupService {

  constructor(private http:HttpClient) { 

  }

  listClusterRoles(): Observable<HttpResponse<ApiGroupList>> {

    return this.http.get<ApiGroupList>(API_BASE+'/apis/',
        {headers,observe: 'response'}
      );
  }

  listResources(groupVersion: string): Observable<HttpResponse<ApiResourceList>> {

    return this.http.get<ApiResourceList>(API_BASE+'/apis/'+groupVersion,
        {headers,observe: 'response'}
      );
  }

  listResourcesV1(): Observable<HttpResponse<ApiResourceList>> {

    return this.http.get<ApiResourceList>(API_BASE+'/api/v1',
        {headers,observe: 'response'}
      );
  }
}
