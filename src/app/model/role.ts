import { Metadata } from "./metadata";
import { PolicyRules } from "./policy-rules";

export class Role {

    apiVersion: string;
    kind: string;
    metadata: Metadata;
    rules: PolicyRules[]

    constructor(){
        this.metadata=new Metadata();
        this.rules= Array<PolicyRules>();
    }
}
