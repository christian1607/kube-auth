import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AppComponent } from '../app.component';
import { ClusterRole } from '../model/cluster-role';
import { ClusterRoleBinding } from '../model/cluster-role-binding';
import { ClusterRoleBindingList } from '../model/cluster-role-binding-list';
import { ClusterRoleList } from '../model/cluster-role-list';




@Injectable({
  providedIn: 'root'
})
export class ClusterRoleBindingService {

  constructor(private http:HttpClient) { 

  }

  listClusterRolesBindings(): Observable<HttpResponse<ClusterRoleBindingList>> {

    return this.http.get<ClusterRoleBindingList>(AppComponent.apiServerUrl+'/apis/rbac.authorization.k8s.io/v1/clusterrolebindings',
        {observe: 'response'}
      );
  }

  findClusterRolesBindings(name:string): Observable<HttpResponse<ClusterRoleBinding>> {

    return this.http.get<ClusterRoleBinding>(AppComponent.apiServerUrl+'/apis/rbac.authorization.k8s.io/v1/clusterrolebindings/'+name,
        {observe: 'response'}
      );
  }
  createClusterRoleBinding(crb:ClusterRoleBinding): Observable<HttpResponse<ClusterRoleBinding>> {
    return this.http.post<ClusterRoleBinding>(AppComponent.apiServerUrl+'/apis/rbac.authorization.k8s.io/v1/clusterrolebindings',
        crb,
        {observe: 'response'}
      );
  }

  updateClusterRoleBinding(name: string, crb:ClusterRoleBinding): Observable<HttpResponse<ClusterRoleBinding>> {
    return this.http.put<ClusterRoleBinding>(AppComponent.apiServerUrl+'/apis/rbac.authorization.k8s.io/v1/clusterrolebindings/'+name,
        crb,
        {observe: 'response'}
      );
  }

  deleteClusterRoleBinding(name: string): Observable<HttpResponse<ClusterRoleBinding>> {
    return this.http.delete<ClusterRoleBinding>(AppComponent.apiServerUrl+'/apis/rbac.authorization.k8s.io/v1/clusterrolebindings/'+name,   
        {observe: 'response'}
      );
  }
}
