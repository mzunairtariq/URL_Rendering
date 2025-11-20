import * as React from "react";
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { CellRendererOverrides, RendererParams } from "./types";

const TARGET_COL = "khurram_url";

export const cellRendererOverrides: CellRendererOverrides = {

    ["Text"]: (props: unknown, rendererParams: RendererParams) => {

        // LOG EVERY COLUMN (Only do this for debugging, it's noisy!)
        const colName = rendererParams.colDefs?.[rendererParams.columnIndex]?.name;

        // We log only once per column to avoid crashing the browser with 1000 logs
        // (Just a simple check logic here)
        if (colName === TARGET_COL) {
            console.log(`--- [PCF DEBUG] Rendering Match Found for: ${colName} ---`);
        }

        if (colName === TARGET_COL) {
            const urlValue = rendererParams.value as string;

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
                    styles={{ root: { height: '24px', fontSize: '12px', width: '100%' } }}
                />
            );
        }
        return null;
    }
};