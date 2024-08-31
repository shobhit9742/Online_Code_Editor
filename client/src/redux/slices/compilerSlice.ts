import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/react";

export interface compilerSliceStateType {

    fullCode: {
        html: string;
        css: string;
        javascript: string;
    };

    currentLanguage: "html" | "css" | "javascript";
    currentCode: string;
}

const initialState: compilerSliceStateType = {
    // html: "",
    // css: "",
    // javascript: "",
    fullCode: {
        html: "this is HTML code",
        css: "this is CSS code",
        javascript: "this is JavaScript code",
    },
    currentLanguage: "html",
    currentCode: "",
};

const compilerSlice = createSlice({
    name: "compilerSlice",
    initialState,
    reducers: {
        updateCurrentLanguage: (
            state,
            action: PayloadAction<compilerSliceStateType["currentLanguage"]>

        ) => {
            state.currentLanguage = action.payload;
        },

        updateCodeValue: (state, action: PayloadAction<string>) => {
            // const { code, language } = action.payload;
            // state.fullCode[language] = code;
            state.fullCode[state.currentLanguage] = action.payload;
        },

        // ....................not req now............................................................................................
        updateCurrentCode: (state, action: PayloadAction<string>) => {
            state.currentCode = action.payload;
        },
    },

});

export default compilerSlice.reducer;
export const { updateCurrentLanguage, updateCurrentCode, updateCodeValue } = compilerSlice.actions;