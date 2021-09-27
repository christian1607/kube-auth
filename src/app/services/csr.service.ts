import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import { CertificateSigningRequest } from '../model/certificate-signing-request';
import { CertificateSigningRequestList } from '../model/certificate-signing-request-list';
import { CertificateSigningRequestStatus } from '../model/certificate-signing-request-status';

const API_BASE=environment.API_BASE
const headers = environment.headers

@Injectable({
  providedIn: 'root'
})
export class CsrService {

  constructor(private http:HttpClient) { 

  }

  listCertificateSigningRequest(): Observable<HttpResponse<CertificateSigningRequestList>> {
    return this.http.get<CertificateSigningRequestList>(API_BASE+'/apis/certificates.k8s.io/v1/certificatesigningrequests', 
      {
        headers,
        observe: 'response'
      }
    );
  }

  createCertificateSigningRequest(csr:CertificateSigningRequest): Observable<HttpResponse<CertificateSigningRequest>> {
    return this.http.post<CertificateSigningRequest>(API_BASE+'/apis/certificates.k8s.io/v1/certificatesigningrequests',
      csr,
      {
        headers,
        observe: 'response'
      }
    );
  }

  deleteCertificateSigningRequest(name:string): Observable<HttpResponse<any>> {
    return this.http.delete<any>(API_BASE+'/apis/certificates.k8s.io/v1/certificatesigningrequests/'+name,
      {
        headers,
        observe: 'response'
      }
    );
  }


  updateCertificateSigningRequest(csr:CertificateSigningRequest): Observable<HttpResponse<any>> {
    return this.http.put<any>(API_BASE+'/apis/certificates.k8s.io/v1/certificatesigningrequests/'+csr.metadata.name,
      csr,
      {
        headers,
        observe: 'response'
      }
    );
  }


  replaceCertificateSigningRequest(csr:CertificateSigningRequest): Observable<HttpResponse<any>> {
    return this.http.put<any>(API_BASE+'/apis/certificates.k8s.io/v1/certificatesigningrequests/'+csr.metadata.name+"/approval",
      csr,
      {
        headers,
        observe: 'response'
      }
    );
  }


  approval
}