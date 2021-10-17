import { ApiBase } from "./api-base";
import { Metadata } from "./metadata";
import { ServiceAccount } from "./service-account";

export class ServiceAccountList extends ApiBase{

    metadata : Metadata
    items: ServiceAccount[]
    
}
