import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClusterRole } from '../model/cluster-role';
import { Role } from '../model/role';
import { RoleList } from '../model/role-list';
import {environment} from '../../environments/environment';

const API_BASE=environment.API_BASE
const headers = environment.headers

@Injectable({
  providedIn: 'root'
})
export class ClusterRoleService {

  constructor(private http:HttpClient) { 

  }

  listRolesAllNamespaces(): Observable<HttpResponse<RoleList>> {
    return this.http.get<RoleList>(API_BASE+'/apis/rbac.authorization.k8s.io/v1/roles',
        {headers,observe: 'response'}
      );
  }

  listRoles(namespace:string): Observable<HttpResponse<RoleList>> {
    return this.http.get<RoleList>(API_BASE+'/apis/rbac.authorization.k8s.io/v1/namespace/'+namespace +'/roles',
        {headers,observe: 'response'}
      );
  }

  getRole(namespace:string, name: string): Observable<HttpResponse<Role>> {
    return this.http.get<Role>(API_BASE+'/apis/rbac.authorization.k8s.io/v1/namespace/'+namespace +'/roles/'+name,
      {headers,observe: 'response'}
      );
  }

  createRole(namespace:string, role:Role): Observable<HttpResponse<Role>> {
    return this.http.post<Role>(API_BASE+'/apis/rbac.authorization.k8s.io/v1/namespace/'+namespace +'/roles',
      role,
      {headers,observe: 'response'}
      );
  }

  updateRole(name: string,namespace:string, role:Role): Observable<HttpResponse<Role>> {
    return this.http.put<Role>(API_BASE+'/apis/rbac.authorization.k8s.io/v1/namespace/'+namespace +'/roles/'+name,
      role,
      {headers,observe: 'response'}
      );
  }

  deleteRole(name: string,namespace:string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(API_BASE+'/apis/rbac.authorization.k8s.io/v1/namespace/'+namespace +'/roles/'+name,
      {headers,observe: 'response'}
      );
  }
}
