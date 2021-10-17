import { Metadata } from "./metadata"
import { RoleRef } from "./role-ref"
import { Subject } from "./subject"

export class RoleBinding {

    metadata: Metadata
    roleRef: RoleRef
    subjects: Subject[]
    
    constructor(){
        this.metadata=new Metadata()
    }
    
}
