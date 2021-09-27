import { CertificateSigningRequestCondition } from "./certificate-signing-request-condition"

export class CertificateSigningRequestStatus {

    certificate: string
    conditions: CertificateSigningRequestCondition[]
    
    constructor(){
        this.conditions = []
    }

}
