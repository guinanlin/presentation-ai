import { type TElement } from "platejs";
import { createTPlatePlugin } from "platejs/react";
import { DivElement } from "../custom-elements/div-element";

export const ELEMENT_DIV = "div";

export const DivPlugin = createTPlatePlugin({
    key: ELEMENT_DIV,
    node: {
        isElement: true,
        type: ELEMENT_DIV,
        component: DivElement,
    },
});

export type TDivElement = TElement & { type: typeof ELEMENT_DIV };
