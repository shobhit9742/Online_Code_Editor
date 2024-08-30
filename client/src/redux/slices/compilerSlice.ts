import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/react";

export interface compilerSliceStateType {
    html: string;
    css: string;
    javascript: string;
    currentLanguage: "html" | "css" | "javascript";
}

const initialState: compilerSliceStateType = {
    html: "",
    css: "",
    javascript: "",
    currentLanguage: "html"
};

const compilerSlice = createSlice({
    name: "compilerSlice",
    initialState,
    reducers: {
        updateCurrentLanguage: (state, action: PayloadAction<compilerSliceStateType["currentLanguage"]>

        ) => {
            state.currentLanguage = action.payload;
        }
    },

});

export default compilerSlice.reducer;
export const { updateCurrentLanguage } = compilerSlice.actions;