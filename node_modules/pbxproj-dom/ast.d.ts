export declare type Kind = "Document" | "Dictionary" | "KeyValuePair" | "StringBlock" | "CommentBlock" | "List" | "Identifier" | "WhiteSpace" | "Space" | "Null";
export declare function isKVPDictionary(kvp: KeyValuePair<Value>): kvp is KeyValuePair<Dictionary>;
export declare function isDictionary(node: Node): node is Dictionary;
export declare function isList(node: Node): node is List;
export declare function isIdentifier(node: Node): node is Identifier;
export declare function isStringBlock(node: Node): node is StringBlock;
export declare function isNull(node: Node): node is Null;
export declare abstract class Node {
    kind: Kind;
    parent: Node;
    constructor(...children: Node[]);
    /**
     * If the node is Dictionary, returns array with its KeyValuePair items. Returns empty array otherwise.
     */
    readonly kvps: KeyValuePair<Value>[];
    /**
     * If the node is List, returns array with its Value nodes. Returns empty array otherwise.
     */
    readonly items: Value[];
    /**
     * Read the text of text nodes. Returns undefined for dictionaries and arrays.
     */
    readonly text: string;
    /**
     * Returns JSON object matching the AST.
     */
    readonly json: any;
    /**
     * Get the indentation that should be used for the children of this Node.
     * For example the indent property of a List will be used when new items are added, and applied to preserve good formatting.
     */
    readonly indent: string;
    get(key: string): NullableValue;
}
export declare class Null extends Node {
    static instance: Null;
}
export declare class Document extends Node {
    root: Dictionary;
    private _s1;
    constructor(root: Dictionary, _s1: Space);
    readonly json: any;
    get(key: string): NullableValue;
    forEach(cb: (kvp: KeyValuePair<Value>) => void): void;
    toString(): string;
}
export declare class Dictionary extends Node {
    private _s1;
    private _content;
    private _s2;
    constructor(_s1: Space, _content: KeyValuePair<Value>[], _s2: Space);
    readonly indent: string;
    readonly kvps: KeyValuePair<Value>[];
    readonly json: any;
    get(key: string): NullableValue;
    /**
     * Perform "RFC 7386 - JSON Merge Patch" on the json version of the AST
     * and tries to propagate the changes back to the AST.
     *
     * A Node can not change its own type based on the merge.
     * Arrays are completely overwritten.
     */
    patch(json: any): void;
    set(key: string, value: Value): void;
    delete(key: string): void;
    toString(): string;
}
export declare type Value = StringBlock | Dictionary | List | Identifier;
export declare type NullableValue = Value | Null;
export declare type Key = StringBlock | Identifier;
export declare class KeyValuePair<V extends Value> extends Node {
    private _key;
    private _s2;
    value: V;
    private _s3;
    constructor(_key: Key, _s2: Space, value: V, _s3: Space);
    readonly key: Key;
    toString(): string;
    get(key: string): NullableValue;
}
export declare class StringBlock extends Node {
    private _s1;
    text: string;
    constructor(_s1: Space, text: string);
    readonly json: string;
    toString(): string;
}
export declare class CommentBlock extends Node {
    private _text;
    constructor(_text: string);
    readonly text: string;
    toString(): string;
}
export declare class List extends Node {
    private _s1;
    private _content;
    private _s2;
    constructor(_s1: Space, _content: [Value, Space, ","][], _s2: Space);
    readonly indent: string;
    readonly items: Value[];
    readonly json: any[];
    toString(): string;
    static flatten(arr: [Value, Space, ","][]): Node[];
}
export declare class Identifier extends Node {
    private _s1;
    text: string;
    constructor(_s1: Space, text: string);
    readonly json: string;
    toString(): string;
}
export declare class WhiteSpace extends Node {
    text: string;
    constructor(text: string);
    toString(): string;
}
export declare class Space extends Node {
    private _content;
    constructor(_content: (WhiteSpace | CommentBlock)[]);
    toString(): string;
}
