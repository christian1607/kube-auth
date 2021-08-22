import { ApiResource } from "./api-resource";

export class ApiGroupResource {

    group: string;
    resources: ApiResource[]

    constructor(group: string, resources: ApiResource[]){
        this.group=group;
        this.resources=resources;
    }

}
