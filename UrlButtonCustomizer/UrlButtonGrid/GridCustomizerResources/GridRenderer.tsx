import * as React from "react";
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { CellRendererOverrides, GetRendererParams, CellRendererProps } from "./types";

const TARGET_COL = "khurram_url";

export const cellRendererOverrides: CellRendererOverrides = {

    ["Text"]: (props: CellRendererProps, rendererParams: GetRendererParams) => {

        // 1. Get Column Name (Using Official Types)
        const colName = rendererParams.colDefs?.[rendererParams.columnIndex]?.name;

        // Safety check
        if (!colName) return null;

        // 2. Check Match (Using includes for aliasing)
        if (colName.includes(TARGET_COL)) {
            
            console.log(`[PCF DEBUG] Match Found for column: ${colName}`);

            // 3. Get Value from 'props' (Official way), not rendererParams
            const urlValue = props.value as string;

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