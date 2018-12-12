import * as pbx from "./pbx";
export interface ManualSigning {
    team: string;
    uuid: string;
    name: string;
    identity?: "iPhone Developer" | "iPhone Distribution" | string;
}
export interface AutomaticSigning {
    team: string;
}
/**
 * Facade encapsulating common Xcode interractions.
 */
export declare class Xcode {
    /**
     * Readonly, pbx project dom.
     */
    document: pbx.Document;
    /**
     * Readonly, project file path.
     */
    path: string;
    /**
     * Opens an existing Xcode project file.
     */
    static open(path: string): Xcode;
    /**
     * Save the project back to the project file.
     */
    save(): void;
    /**
     * Sets Manual signing style for a target in the pbx.Document.
     */
    setManualSigningStyle(targetName: string, {team, uuid, name, identity}?: ManualSigning): void;
    /**
     * Sets Automatic signing style for a target in the pbx.Document.
     */
    setAutomaticSigningStyle(targetName: string, developmentTeam: string): void;
    /**
     * Read the signing configuration for a target.
     */
    getSigning(targetName: string): {
        style: "Automatic";
        team: string;
    } | {
        style: "Manual";
        configurations: {
            [config: string]: ManualSigning;
        };
    } | undefined;
    /**
     * Serializes the project back to string format.
     */
    toString(): string;
}
