import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CertificateSigningRequestList } from '../../../../model/certificate-signing-request-list';
import { CsrService } from '../../../../services/csr.service';
import { timeout } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MonacoFile } from 'ngx-monaco';
import { CertificateSigningRequest } from '../../../../model/certificate-signing-request';
import { env } from 'process';
import { CertificateSigningRequestCondition } from '../../../../model/certificate-signing-request-condition';
import { CertificateSigningRequestStatus } from '../../../../model/certificate-signing-request-status';

@Component({
  selector: 'app-evaluate-access',
  styles: ['monaco-editor { height: 200px; display:block; }'],
  templateUrl: './evaluate-access.component.html'
})
export class EvaluateAccessComponent implements OnInit {


  @ViewChild('approveModal') 
  public approveModal: ModalDirective;
  @ViewChild('denyModal') 
  public denyModal: ModalDirective;
  @ViewChild('kubeconfigModal') 
  public kubeconfigModal: ModalDirective;

  csrList: CertificateSigningRequestList=new CertificateSigningRequestList();
  approveComment: string
  denyComment: string

  private csrDeny: CertificateSigningRequest
  private csrApprove: CertificateSigningRequest

  file: MonacoFile = {
		uri: 'index.js',
		language: 'yaml',
		content: ``
	};



  constructor(private csrService: CsrService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {

    this.listCertificateSingingRequests()
  }

  private listCertificateSingingRequests(){

    this.csrService.
    listCertificateSigningRequest()
      .pipe(timeout(environment.TIMEOUT_HTTP_REQUEST))
      .subscribe( r=>{
      /*  var pendingCsrs= r.body.items.filter(csr=>{
            if(csr.status){
              debugger
              if (csr.status.conditions){
                return  csr.status.conditions.length>0?false:true
              }
              return true
            }else{
              return true;
            }
          }) 
        */
          this.csrList=r.body
          //this.csrList.items=pendingCsrs
        },
        e=>{
          this.toastr.error("an error ocurred trying to fetch CSRs.")
        }

      )
  }

  openApproveModal(csrName:CertificateSigningRequest){
    this.csrApprove=csrName
    this.approveModal.show()
  }

  closeApproveModal(){
    this.approveModal.hide()
  }
  

  openDenyModal(csrName:CertificateSigningRequest){
    this.csrDeny=csrName
    this.denyModal.show()
  }
  
  closeDenyModal(){
    this.denyModal.hide()
  }


  approveAccess(){
    var condition=new CertificateSigningRequestCondition()
    condition.type="Approved"
    condition.status="True"
    condition.reason=this.approveComment
    condition.message=this.approveComment
    debugger

    if (this.csrApprove.status){
      this.csrApprove.status=new CertificateSigningRequestStatus()
    }

    this.csrApprove.status.conditions.push(condition)

    this.csrService.replaceCertificateSigningRequest(this.csrApprove).subscribe(resp=>{
      if (resp.ok){
        this.toastr.success("Access request accepted.")
        this.listCertificateSingingRequests()
        this.approveModal.hide()
        return
      }
      this.toastr.error("An error has ocurred approving the access request")

    })
    
  }

  denyAccess(){
    var condition=new CertificateSigningRequestCondition()
    condition.type="Denied"
    condition.status="True"
    condition.reason=this.denyComment
    condition.message=this.denyComment
    debugger

    if (this.csrDeny.status){
      this.csrDeny.status=new CertificateSigningRequestStatus()
    }
    this.csrDeny.status.conditions.push(condition)
    this.csrService.replaceCertificateSigningRequest(this.csrDeny).subscribe(resp=>{
      if (resp.ok){
        
        this.toastr.success("Access request denied.")
        this.listCertificateSingingRequests()
        this.denyModal.hide()
        return
      }
      this.toastr.error("An error has ocurred while denying the access request")

    })
  }


  showKubeconfig(csr:CertificateSigningRequest){
    this.file.content=`

apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: ${env.CLUSTER_CA}
    server: ${env.API_BASE}
  name: ${env.CLUSTER_NAME}
contexts:
- context:
    cluster: ${env.CLUSTER_NAME}
    user: ${csr.metadata.name}
  name: ${csr.metadata.name}-${env.CLUSTER_NAME}

current-context: ${csr.metadata.name}-${env.CLUSTER_NAME}
kind: Config
preferences: {}
users:
- name: ${csr.metadata.name}
  user:
    client-certificate-data: ${btoa(csr.status.certificate)}
    client-key-data: <PASTE HERE YOUR PRIVATE KEY>
    
`
    this.kubeconfigModal.show()
  }

}
