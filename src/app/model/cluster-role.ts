import { PolicyRules } from "./policy-rules";

export class ClusterRole {

    apiVersion: string;
    kind: string;
    metadata: Object;
    rules: PolicyRules[]

}
