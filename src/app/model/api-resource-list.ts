import { ApiBase } from "./api-base";
import { ApiResource } from "./api-resource";

export class ApiResourceList  extends ApiBase{

    groupVersion: string;
    resources: ApiResource[]

}
