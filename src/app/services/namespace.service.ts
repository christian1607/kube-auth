import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import { AppComponent } from '../app.component';
import { NamespaceList } from '../model/namespace-list';


@Injectable({
  providedIn: 'root'
})
export class NamespaceService {

  constructor(private http:HttpClient) { 

  }

  listAllNamespaces(): Observable<HttpResponse<NamespaceList>> {
    return this.http.get<NamespaceList>(AppComponent.apiServerUrl+'/api/v1/namespaces',
        {observe: 'response'}
      );
  }


}
