
import { ApiBase } from "./api-base";
import { RoleRef } from "./role-ref";
import { Subject } from "./subject";

export class ClusterRoleBinding  extends ApiBase{

    roleRef: RoleRef

    subjects: Subject[]

}
