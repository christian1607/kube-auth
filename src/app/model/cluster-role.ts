import { Metadata } from "./metadata";
import { PolicyRules } from "./policy-rules";

export class ClusterRole {

    apiVersion: string;
    kind: string;
    metadata: Metadata;
    rules: PolicyRules[]

    constructor(){
        this.apiVersion="rbac.authorization.k8s.io/v1"
        this.kind="ClusterRole"
        this.metadata=new Metadata();
        this.rules= Array<PolicyRules>();
    }
}
