import { GroupVersion } from "./group-version";

export class ApiGroup {

    name: string;
    versions: GroupVersion[]
    preferredVersion: GroupVersion
}
