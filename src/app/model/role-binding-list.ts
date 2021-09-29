import { ApiBase } from "./api-base";
import { RoleBinding } from "./role-binding";

export class RoleBindingList extends ApiBase{

        items: RoleBinding[]
    
        constructor(){
            super();
            this.items=[];
        }
}
