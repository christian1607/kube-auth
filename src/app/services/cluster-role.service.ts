import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClusterRoleList } from '../model/cluster-role-list';


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

  listClusterRoles(): Observable<HttpResponse<ClusterRoleList>> {

    return this.http.get<ClusterRoleList>(API_BASE+'/apis/rbac.authorization.k8s.io/v1/clusterroles',
        {headers,observe: 'response'}
      );
  }
}
