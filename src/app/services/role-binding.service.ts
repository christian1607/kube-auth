import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AppComponent } from '../app.component';
import { RoleBinding } from '../model/role-binding';
import { RoleBindingList } from '../model/role-binding-list';



@Injectable({
  providedIn: 'root'
})
export class RoleBindingService {

  constructor(private http:HttpClient) { 

  }

  listRolesBindings(): Observable<HttpResponse<RoleBindingList>> {

    return this.http.get<RoleBindingList>(AppComponent.apiServerUrl+'/apis/rbac.authorization.k8s.io/v1/rolebindings',
        {observe: 'response'}
      );
  }


  listRolesBindingsByNamespace(namespace: string): Observable<HttpResponse<RoleBindingList>> {

    return this.http.get<RoleBindingList>(AppComponent.apiServerUrl+'/apis/rbac.authorization.k8s.io/v1/namespaces/'+ namespace + '/rolebindings',
        {observe: 'response'}
      );
  }

  createRoleBinding(crb:RoleBinding,namespace: string): Observable<HttpResponse<RoleBinding>> {
    return this.http.post<RoleBinding>(AppComponent.apiServerUrl+'/apis/rbac.authorization.k8s.io/v1/namespaces/'+ namespace + '/rolebindings',
        crb,
        {observe: 'response'}
      );
  }

  updateRoleBinding(name: string, crb:RoleBinding,namespace: string): Observable<HttpResponse<RoleBinding>> {
    return this.http.put<RoleBinding>(AppComponent.apiServerUrl+'/apis/rbac.authorization.k8s.io/v1/namespaces/'+ namespace + '/rolebindings/'+name,
        crb,
        {observe: 'response'}
      );
  }

  deleteRoleBinding(name: string,namespace: string): Observable<HttpResponse<RoleBinding>> {
    return this.http.delete<RoleBinding>(AppComponent.apiServerUrl+'/apis/rbac.authorization.k8s.io/v1/namespaces/'+ namespace + '/rolebindings/'+name,   
        {observe: 'response'}
      );
  }


  findRoleBinding(name:string,namespace: string): Observable<HttpResponse<RoleBinding>> {

    return this.http.get<RoleBinding>(AppComponent.apiServerUrl+'/apis/rbac.authorization.k8s.io/v1/namespaces/'+ namespace + '/rolebindings/'+name,
        {observe: 'response'}
      );
  }
}
