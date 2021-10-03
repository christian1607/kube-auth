
export class Subject  {

    apiGroup: string
    kind: string;
    name: string
    namespace: string

    constructor(name:string, apiGroup: string, kind:string, namespace?:string ){
        this.name=name
        this.apiGroup=apiGroup
        this.kind=kind
        if (namespace){
            this.namespace=namespace
        }
    } 
}
