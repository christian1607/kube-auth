export class ApiResourceAction {

    verb: string;
    selected: boolean;

    constructor(verb: string,selected: boolean){
        this.verb=verb;
        this.selected=selected;
    }
}
