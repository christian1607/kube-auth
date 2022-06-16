import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../model/role';
import { RoleList } from '../model/role-list';
import {environment} from '../../environments/environment';
import { AppComponent } from '../app.component';


@Injectable({
  providedIn: 'root'
})
export class RoleService {
  
  constructor(private http:HttpClient) { 

  }

  listRolesAllNamespaces(): Observable<HttpResponse<RoleList>> {
    return this.http.get<RoleList>(AppComponent.apiServerUrl+'/apis/rbac.authorization.k8s.io/v1/roles',
        {observe: 'response'}
      );
  }

  listRoles(namespace:string): Observable<HttpResponse<RoleList>> {
    return this.http.get<RoleList>(AppComponent.apiServerUrl+'/apis/rbac.authorization.k8s.io/v1/namespaces/'+namespace +'/roles',
        {observe: 'response'}
      );
  }

  getRole(namespace:string, name: string): Observable<HttpResponse<Role>> {
    return this.http.get<Role>(AppComponent.apiServerUrl+'/apis/rbac.authorization.k8s.io/v1/namespaces/'+namespace +'/roles/'+name,
      {observe: 'response'}
      );
  }

  createRole(namespace:string, role:Role): Observable<HttpResponse<Role>> {
    return this.http.post<Role>(AppComponent.apiServerUrl+'/apis/rbac.authorization.k8s.io/v1/namespaces/'+namespace +'/roles',
      role,
      {observe: 'response'}
      );
  }

  updateRole(name: string,namespace:string, role:Role): Observable<HttpResponse<Role>> {
    return this.http.put<Role>(AppComponent.apiServerUrl+'/apis/rbac.authorization.k8s.io/v1/namespaces/'+namespace +'/roles/'+name,
      role,
      {observe: 'response'}
      );
  }

  deleteRole(name: string,namespace:string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(AppComponent.apiServerUrl+'/apis/rbac.authorization.k8s.io/v1/namespaces/'+namespace +'/roles/'+name,
      {observe: 'response'}
      );
  }
}
