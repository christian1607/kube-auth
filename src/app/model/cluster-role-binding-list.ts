import { ApiBase } from "./api-base";
import { ClusterRoleBinding } from "./cluster-role-binding";

export class ClusterRoleBindingList  extends ApiBase{

    items: ClusterRoleBinding[]

    constructor(){
        super();
        this.items=[];
    }
}
