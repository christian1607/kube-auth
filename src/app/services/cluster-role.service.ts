import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AppComponent } from '../app.component';
import { ClusterRole } from '../model/cluster-role';
import { ClusterRoleList } from '../model/cluster-role-list';


@Injectable({
  providedIn: 'root'
})
export class ClusterRoleService {

  constructor(private http:HttpClient) { 

  }

  listClusterRoles(): Observable<HttpResponse<ClusterRoleList>> {

    return this.http.get<ClusterRoleList>(AppComponent.apiServerUrl+'/apis/rbac.authorization.k8s.io/v1/clusterroles',
        {observe: 'response'}
      );
  }

  createClusterRole(clusterRole:ClusterRole): Observable<HttpResponse<ClusterRole>> {
    return this.http.post<ClusterRole>(AppComponent.apiServerUrl+'/apis/rbac.authorization.k8s.io/v1/clusterroles',
      clusterRole,
      {observe: 'response'}
      );
  }

  updateClusterRole(name: string, clusterRole:ClusterRole): Observable<HttpResponse<ClusterRole>> {
    return this.http.put<ClusterRole>(AppComponent.apiServerUrl+'/apis/rbac.authorization.k8s.io/v1/clusterroles/'+name,
      clusterRole,
      {observe: 'response'}
      );
  }

  getClusterRole(name: string): Observable<HttpResponse<ClusterRole>> {
    return this.http.get<ClusterRole>(AppComponent.apiServerUrl+'/apis/rbac.authorization.k8s.io/v1/clusterroles/'+name,
      {observe: 'response'}
      );
  }

  deleteClusterRole(name: string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(AppComponent.apiServerUrl+'/apis/rbac.authorization.k8s.io/v1/clusterroles/'+name,
      {observe: 'response'}
      );
  }
}
