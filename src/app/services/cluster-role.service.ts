import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ClusterRole } from '../model/cluster-role';
import { ClusterRoleList } from '../model/cluster-role-list';


const API_BASE=environment.API_BASE
const headers = environment.headers

@Injectable({
  providedIn: 'root'
})
export class ClusterRoleService {

  constructor(private http:HttpClient) { 

  }

  listClusterRoles(): Observable<HttpResponse<ClusterRoleList>> {

    return this.http.get<ClusterRoleList>(API_BASE+'/apis/rbac.authorization.k8s.io/v1/clusterroles',
        {headers,observe: 'response'}
      );
  }

  createClusterRole(clusterRole:ClusterRole): Observable<HttpResponse<ClusterRole>> {
    return this.http.post<ClusterRole>(API_BASE+'/apis/rbac.authorization.k8s.io/v1/clusterroles',
      clusterRole,
      {headers,observe: 'response'}
      );
  }

  updateClusterRole(name: string, clusterRole:ClusterRole): Observable<HttpResponse<ClusterRole>> {
    return this.http.put<ClusterRole>(API_BASE+'/apis/rbac.authorization.k8s.io/v1/clusterroles/'+name,
      clusterRole,
      {headers,observe: 'response'}
      );
  }

  getClusterRole(name: string): Observable<HttpResponse<ClusterRole>> {
    return this.http.get<ClusterRole>(API_BASE+'/apis/rbac.authorization.k8s.io/v1/clusterroles/'+name,
      {headers,observe: 'response'}
      );
  }

  deleteClusterRole(name: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(API_BASE+'/apis/rbac.authorization.k8s.io/v1/clusterroles/'+name,
      {headers,observe: 'response'}
      );
  }
}
