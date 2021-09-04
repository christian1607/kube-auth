import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import { NamespaceList } from '../model/namespace-list';

const API_BASE=environment.API_BASE
const headers = environment.headers

@Injectable({
  providedIn: 'root'
})
export class NamespaceService {

  constructor(private http:HttpClient) { 

  }

  listAllNamespaces(): Observable<HttpResponse<NamespaceList>> {
    return this.http.get<NamespaceList>(API_BASE+'/api/v1/namespaces',
        {headers,observe: 'response'}
      );
  }


}
