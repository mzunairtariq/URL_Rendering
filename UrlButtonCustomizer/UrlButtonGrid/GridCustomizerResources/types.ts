import * as React from "react";

export interface RendererParams {
    colDefs: { name: string }[];
    columnIndex: number;
    value: unknown;
}

// --- THE FIX ---
// Changed from 'interface' with [key: string] to 'type' with Record<string, ...>
export type CellRendererOverrides = Record<
    string, 
    (props: unknown, rendererParams: RendererParams) => React.ReactElement | null | undefined
>;

export interface PAOneGridCustomizer {
    cellRendererOverrides?: CellRendererOverrides;
}

export interface GridCustomizerFactory {
    fireEvent: (eventName: string, params: PAOneGridCustomizer) => void;
}