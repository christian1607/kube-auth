
import { ApiBase } from "./api-base";
import { Metadata } from "./metadata";
import { RoleRef } from "./role-ref";
import { Subject } from "./subject";

export class ClusterRoleBinding  extends ApiBase{

    metadata: Metadata

    roleRef: RoleRef

    subjects: Subject[]

    constructor(){
        super();
        this.apiVersion="rbac.authorization.k8s.io/v1"
        this.kind="ClusterRoleBinding"
        this.subjects=[]
        this.metadata=new Metadata()
        this.roleRef=new RoleRef()
    }

}
