import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClusterRole } from '../model/cluster-role';
import { Role } from '../model/role';
import { RoleList } from '../model/role-list';


const API_BASE='https://192.168.0.110:6443'

const headers = new HttpHeaders()
            .set("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ik1oYV9kVmVuT2lBR2VKNndJSzFxQ1BESENsWDVPTUhyS0tiZ1VKbWwxS3MifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJkZWZhdWx0Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6ImFwaS11c2VyLXRva2VuLTZtY2tjIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6ImFwaS11c2VyIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQudWlkIjoiODVhZjRkN2QtNjMyZC00OTE3LThiMzItMWZiNWUyMDA0ZWM2Iiwic3ViIjoic3lzdGVtOnNlcnZpY2VhY2NvdW50OmRlZmF1bHQ6YXBpLXVzZXIifQ.ZYR6y1d8We91qUhAbZdiS03TRiewXSC6Q5ZtEajKfwiGGtKAaqiF-EQuPkMMHrjW1scvulpIAI0vshED37abhFYENhj1Z0rN7HTtWJYpq2ui8II_WIm3gFXour0QNbh5lUQ-hF2Gu_2zkvGiink1xIlhrnrYo971gRSNhJDkjapmFR_s4CixqTQswrCyzRddrQ_aLX_RZ3CiuGYR8GKpmsTG7_ytAOPvcoaNEP9mE7ZZngs2BPR4xZJkVIru2Gx834ntSsg64HmoLn__ttcJqgPaK7Fc71RgIc7ikhxW0LRWV-EjEo2TogzQzYA1y1oTadFGFwKlnB1zZEVVUWKBYQ")
            .set("Access-Control-Allow-Origin", "*");

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
