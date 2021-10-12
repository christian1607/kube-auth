import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ClusterRole } from '../model/cluster-role';
import { ClusterRoleBinding } from '../model/cluster-role-binding';
import { ClusterRoleBindingList } from '../model/cluster-role-binding-list';
import { ClusterRoleList } from '../model/cluster-role-list';


const API_BASE=environment.API_BASE
const headers = environment.headers

@Injectable({
  providedIn: 'root'
})
export class ClusterRoleBindingService {

  constructor(private http:HttpClient) { 

  }

  listClusterRolesBindings(): Observable<HttpResponse<ClusterRoleBindingList>> {

    return this.http.get<ClusterRoleBindingList>(API_BASE+'/apis/rbac.authorization.k8s.io/v1/clusterrolebindings',
        {headers,observe: 'response'}
      );
  }

  findClusterRolesBindings(name:string): Observable<HttpResponse<ClusterRoleBinding>> {

    return this.http.get<ClusterRoleBinding>(API_BASE+'/apis/rbac.authorization.k8s.io/v1/clusterrolebindings/'+name,
        {headers,observe: 'response'}
      );
  }
  createClusterRoleBinding(crb:ClusterRoleBinding): Observable<HttpResponse<ClusterRoleBinding>> {
    return this.http.post<ClusterRoleBinding>(API_BASE+'/apis/rbac.authorization.k8s.io/v1/clusterrolebindings',
        crb,
        {headers,observe: 'response'}
      );
  }

  updateClusterRoleBinding(name: string, crb:ClusterRoleBinding): Observable<HttpResponse<ClusterRoleBinding>> {
    return this.http.put<ClusterRoleBinding>(API_BASE+'/apis/rbac.authorization.k8s.io/v1/clusterrolebindings/'+name,
        crb,
        {headers,observe: 'response'}
      );
  }

  deleteClusterRoleBinding(name: string): Observable<HttpResponse<ClusterRoleBinding>> {
    return this.http.delete<ClusterRoleBinding>(API_BASE+'/apis/rbac.authorization.k8s.io/v1/clusterrolebindings/'+name,   
        {headers,observe: 'response'}
      );
  }
}
