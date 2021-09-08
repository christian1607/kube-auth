import { ApiBase } from "./api-base";
import { CertificateSigningRequestSpec } from "./certificate-signing-request-spec";
import { CertificateSigningRequestStatus } from "./certificate-signing-request-status";
import { Metadata } from "./metadata";

export class CertificateSigningRequest  extends ApiBase{

    metadata: Metadata;
    spec: CertificateSigningRequestSpec;
    status: CertificateSigningRequestStatus
}
