import * as React from "react";
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { CellRendererOverrides, GetRendererParams, CellRendererProps } from "./types";

export const cellRendererOverrides: CellRendererOverrides = {

    ["Text"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {
        
        // NUCLEAR OPTION: No checks. Just render.
        // If this works, you will see a button in every text cell.
        console.log("[PCF DEBUG] FORCE RENDER TRIGGERED");

        const value = props.value as string;

        return (
            <PrimaryButton
                text="TEST BUTTON" 
                onClick={(e) => { e.stopPropagation(); alert("I AM ALIVE!"); }}
                styles={{ root: { height: '24px', width: '100%', background: 'red' } }}
            />
        );
    }
};