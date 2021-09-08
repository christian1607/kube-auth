import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import { CertificateSigningRequest } from '../model/certificate-signing-request';
import { CertificateSigningRequestStatus } from '../model/certificate-signing-request-status';

const API_BASE=environment.API_BASE
const headers = environment.headers

@Injectable({
  providedIn: 'root'
})
export class CsrService {

  constructor(private http:HttpClient) { 

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
    return this.http.post<any>(API_BASE+'/apis/certificates.k8s.io/v1/certificatesigningrequests/'+name,
      {
        headers,
        observe: 'response'
      }
    );
  }


  updateCertificateSigningRequest(name:string): Observable<HttpResponse<any>> {
    return this.http.post<any>(API_BASE+'/apis/certificates.k8s.io/v1/certificatesigningrequests/'+name,
      {
        headers,
        observe: 'response'
      }
    );
  }

}