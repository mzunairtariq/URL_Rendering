import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import { cellRendererOverrides } from "./GridCustomizerResources/GridRenderer";
import { PAOneGridCustomizer } from "./GridCustomizerResources/types";

export class UrlButtonGrid implements ComponentFramework.ReactControl<IInputs, IOutputs> {

    constructor() {
        //
    }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        const eventName = context.parameters.EventName.raw;

        if (eventName) {
            // Construct the overrides object using the logic from GridRenderer
            const paOneGridCustomizer: PAOneGridCustomizer = {
                cellRendererOverrides
            };

            // OFFICIAL MICROSOFT HANDSHAKE
            // We use this specific comment to allow the 'any' cast without linting errors
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            (context as any).factory.fireEvent(eventName, paOneGridCustomizer);
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