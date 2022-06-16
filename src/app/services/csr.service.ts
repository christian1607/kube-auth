import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { CertificateSigningRequest } from '../model/certificate-signing-request';
import { CertificateSigningRequestList } from '../model/certificate-signing-request-list';



@Injectable({
  providedIn: 'root'
})
export class CsrService {

  constructor(private http:HttpClient) { 

  }

  listCertificateSigningRequest(): Observable<HttpResponse<CertificateSigningRequestList>> {
    return this.http.get<CertificateSigningRequestList>(AppComponent.apiServerUrl+'/apis/certificates.k8s.io/v1/certificatesigningrequests', 
      {
        
        observe: 'response'
      }
    );
  }

  createCertificateSigningRequest(csr:CertificateSigningRequest): Observable<HttpResponse<CertificateSigningRequest>> {
    return this.http.post<CertificateSigningRequest>(AppComponent.apiServerUrl+'/apis/certificates.k8s.io/v1/certificatesigningrequests',
      csr,
      {
        observe: 'response'
      }
    );
  }

  deleteCertificateSigningRequest(name:string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(AppComponent.apiServerUrl+'/apis/certificates.k8s.io/v1/certificatesigningrequests/'+name,
      {
        observe: 'response'
      }
    );
  }


  updateCertificateSigningRequest(csr:CertificateSigningRequest): Observable<HttpResponse<any>> {
    return this.http.put<any>(AppComponent.apiServerUrl+'/apis/certificates.k8s.io/v1/certificatesigningrequests/'+csr.metadata.name,
      csr,
      {
        observe: 'response'
      }
    );
  }


  replaceCertificateSigningRequest(csr:CertificateSigningRequest): Observable<HttpResponse<any>> {
    return this.http.put<any>(AppComponent.apiServerUrl+'/apis/certificates.k8s.io/v1/certificatesigningrequests/'+csr.metadata.name+"/approval",
      csr,
      {
        observe: 'response'
      }
    );
  }


  approval
}