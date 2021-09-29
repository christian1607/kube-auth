import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RoleBinding } from '../model/role-binding';
import { RoleBindingList } from '../model/role-binding-list';


const API_BASE=environment.API_BASE
const headers = environment.headers

@Injectable({
  providedIn: 'root'
})
export class RoleBindingService {

  constructor(private http:HttpClient) { 

  }

  listClusterRolesBindings(): Observable<HttpResponse<RoleBindingList>> {

    return this.http.get<RoleBindingList>(API_BASE+'/apis/rbac.authorization.k8s.io/v1/rolebindings',
        {headers,observe: 'response'}
      );
  }

  createClusterRoleBinding(crb:RoleBinding): Observable<HttpResponse<RoleBinding>> {
    return this.http.post<RoleBinding>(API_BASE+'/apis/rbac.authorization.k8s.io/v1/rolebindings',
        crb,
        {headers,observe: 'response'}
      );
  }

  updateClusterRoleBinding(name: string, crb:RoleBinding): Observable<HttpResponse<RoleBinding>> {
    return this.http.put<RoleBinding>(API_BASE+'/apis/rbac.authorization.k8s.io/v1/rolebindings/'+name,
        crb,
        {headers,observe: 'response'}
      );
  }

  deleteClusterRoleBinding(name: string): Observable<HttpResponse<RoleBinding>> {
    return this.http.delete<RoleBinding>(API_BASE+'/apis/rbac.authorization.k8s.io/v1/rolebindings/'+name,   
        {headers,observe: 'response'}
      );
  }
}
