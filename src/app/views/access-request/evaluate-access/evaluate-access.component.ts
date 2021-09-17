import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CertificateSigningRequestList } from '../../../model/certificate-signing-request-list';
import { CsrService } from '../../../services/csr.service';
import { timeout } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-evaluate-access',
  templateUrl: './evaluate-access.component.html'
})
export class EvaluateAccessComponent implements OnInit {


  @ViewChild('approveModal') 
  public approveModal: ModalDirective;
  @ViewChild('denyModal') 
  public denyModal: ModalDirective;

  csrList: CertificateSigningRequestList=new CertificateSigningRequestList();
  approveComment: string
  denyComment: string

  private csrDeny: string
  private csrApprove: string


  constructor(private csrService: CsrService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {

    this.listPendingCertificateSingingRequests()
  }

  private listPendingCertificateSingingRequests(){

    this.csrService.
    listCertificateSigningRequest()
      .pipe(timeout(environment.TIMEOUT_HTTP_REQUEST))
      .subscribe( r=>{
          r.body.items.filter(csr=>{
            if(csr.status){
              return csr.status.conditions && csr.status.conditions.length>0
            }else{
              return true;
            }
          })
        },
        e=>{
          this.toastr.error("an error ocurred trying to fetch CSRs.")
        }

      )
  }

  openApproveModal(csrName:string){
    this.csrApprove=csrName
    this.approveModal.show()
  }

  closeApproveModal(){
    this.approveModal.hide()
  }
  

  openDenyModal(csrName:string){
    this.csrDeny=csrName
    this.denyModal.show()
  }
  
  closDenyModal(){
    this.approveModal.hide()
  }


  approveAccess(){
    //TODO: update csr object approve status
  }

  denyAccess(){
    //TODO: update csr object with deny status
  }


}
