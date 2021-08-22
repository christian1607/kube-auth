import { ApiResourceAction } from "./api-resource-action";

export class ApiResource {

    name: string;
    namespaced: boolean;
    kind: string;
    verbs: string[];
 
    // helper field used for editing scenarios to complete checkboxs in case of a clusterrole 
    // has this apiresource as part of its rules.
    actions: ApiResourceAction[];

}
