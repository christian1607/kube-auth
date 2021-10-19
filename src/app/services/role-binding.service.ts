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

  listRolesBindings(): Observable<HttpResponse<RoleBindingList>> {

    return this.http.get<RoleBindingList>(API_BASE+'/apis/rbac.authorization.k8s.io/v1/rolebindings',
        {headers,observe: 'response'}
      );
  }


  listRolesBindingsByNamespace(namespace: string): Observable<HttpResponse<RoleBindingList>> {

    return this.http.get<RoleBindingList>(API_BASE+'/apis/rbac.authorization.k8s.io/v1/namespaces/'+ namespace + '/rolebindings',
        {headers,observe: 'response'}
      );
  }

  createRoleBinding(crb:RoleBinding,namespace: string): Observable<HttpResponse<RoleBinding>> {
    return this.http.post<RoleBinding>(API_BASE+'/apis/rbac.authorization.k8s.io/v1/namespaces/'+ namespace + '/rolebindings',
        crb,
        {headers,observe: 'response'}
      );
  }

  updateRoleBinding(name: string, crb:RoleBinding,namespace: string): Observable<HttpResponse<RoleBinding>> {
    return this.http.put<RoleBinding>(API_BASE+'/apis/rbac.authorization.k8s.io/v1/namespaces/'+ namespace + '/rolebindings/'+name,
        crb,
        {headers,observe: 'response'}
      );
  }

  deleteRoleBinding(name: string,namespace: string): Observable<HttpResponse<RoleBinding>> {
    return this.http.delete<RoleBinding>(API_BASE+'/apis/rbac.authorization.k8s.io/v1/namespaces/'+ namespace + '/rolebindings/'+name,   
        {headers,observe: 'response'}
      );
  }


  findRoleBinding(name:string,namespace: string): Observable<HttpResponse<RoleBinding>> {

    return this.http.get<RoleBinding>(API_BASE+'/apis/rbac.authorization.k8s.io/v1/namespaces/'+ namespace + '/rolebindings/'+name,
        {headers,observe: 'response'}
      );
  }
}
