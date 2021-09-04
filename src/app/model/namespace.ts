import { Metadata } from "./metadata";
import { NamespaceSpec } from "./namespace-spec";

export class Namespace {
 
    apiVersion: string;
    kind: string;
    metadata: Metadata;
    spec: NamespaceSpec;
    
}
