import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import { cellRendererOverrides } from "./GridCustomizerResources/GridRenderer";
import { PAOneGridCustomizer, GridCustomizerFactory } from "./GridCustomizerResources/types";

export class UrlButtonGrid implements ComponentFramework.ReactControl<IInputs, IOutputs> {

    constructor() {
        // 
    }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {

        console.log("--- [PCF DEBUG] Init Started ---");

        const eventName = context.parameters.EventName.raw;
        console.log("--- [PCF DEBUG] EventName received:", eventName);

        // REMOVED the "if (eventName)" check. 
        // Sometimes this comes in empty initially, but we should try to fire anyway 
        // or at least log that we are trying.

        if (eventName) {
            console.log("--- [PCF DEBUG] Firing Handshake Event... ---");
            const overrides: PAOneGridCustomizer = {
                cellRendererOverrides: cellRendererOverrides
            };

            // Fire the event (Handshake)
            // We cast factory to our defined interface to satisfy the Linter
            const factory = context.factory as unknown as GridCustomizerFactory;
            factory.fireEvent(eventName, overrides);
            console.log("--- [PCF DEBUG] Handshake Fired! ---");
        } else {
            console.error("--- [PCF DEBUG] ERROR: EventName is Missing/Empty! Handshake aborted. ---");
        }
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        return React.createElement(React.Fragment);
    }

    public getOutputs(): IOutputs { return {}; }
    public destroy(): void {
        // 
    }
}