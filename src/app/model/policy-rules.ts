export class PolicyRules {

    apiGroups: String[];
    nonResourceURLs: String[];
    resourceNames: String[];
    resources: String[];
    verbs: String[];

    constructor(){
        this.apiGroups=[]
        this.nonResourceURLs=[]
        this.resourceNames=[]
        this.resources=[]
        this.verbs=[]
    }
}


