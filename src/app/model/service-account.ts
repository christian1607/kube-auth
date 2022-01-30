import { ApiBase } from "./api-base";
import { Metadata } from "./metadata";

export class ServiceAccount extends ApiBase{

    metadata : Metadata
    automountServiceAccountToken: boolean

    constructor(){
        super();
        this.metadata=new Metadata()
        this.apiVersion = "v1"
        this.kind="ServiceAccount"
    }

}
