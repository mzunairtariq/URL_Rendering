import * as React from "react";
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { CellRendererOverrides, RendererParams } from "./types";

const TARGET_COL = "khurram_url";

export const cellRendererOverrides: CellRendererOverrides = {

    ["Text"]: (props: unknown, rendererParams: RendererParams) => {

        const colName = rendererParams.colDefs?.[rendererParams.columnIndex]?.name;

        // SAFETY CHECK: If no column name, abort
        if (!colName) return null;

        // FIX 3: Use 'includes' to handle Subgrid Aliasing (e.g. "a_123_khurram_url")
        if (colName.includes(TARGET_COL)) {
            
            // Log the success so we know it worked
            console.log(`[PCF DEBUG] Match Found! Rendering Button for: ${colName}`);

            const urlValue = rendererParams.value as string;

            // If value is empty, don't render button
            if (!urlValue) return null;

            return (
                <PrimaryButton
                    text="Open Link"
                    title={urlValue}
                    iconProps={{ iconName: 'OpenInNewWindow' }}
                    onClick={(e) => {
                        e.stopPropagation();
                        let finalUrl = urlValue;
                        if (!finalUrl.startsWith("http")) finalUrl = "https://" + finalUrl;
                        window.open(finalUrl, '_blank');
                    }}
                    styles={{ root: { height: '24px', fontSize: '12px', width: '100%', textAlign: 'left' } }}
                />
            );
        }
        return null;
    }
};