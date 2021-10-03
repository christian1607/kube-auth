export class ApiBase {

    kind: string;
    apiVersion: string;

    
    constructor( kind?: string, apiVersion?: string){
        this.apiVersion=apiVersion
        this.kind=kind
    }
}
