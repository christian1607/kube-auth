import { ApiBase } from "./api-base";
import { Metadata } from "./metadata";

export class ServiceAccount extends ApiBase{

    metadata : Metadata
    automountServiceAccountToken: boolean

}
