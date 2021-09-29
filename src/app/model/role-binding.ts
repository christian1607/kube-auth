import { ApiBase } from "./api-base"
import { RoleRef } from "./role-ref"
import { Subject } from "./subject"

export class RoleBinding extends ApiBase{

        roleRef: RoleRef
    
        subjects: Subject[]
    
}
