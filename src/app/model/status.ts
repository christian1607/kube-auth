import { Metadata } from "./metadata";
import { NamespaceSpec } from "./namespace-spec";

export class Status {
 
    apiVersion: string
    kind: string
    code: number
    message: string
    reason: string
    status: string
    
}
