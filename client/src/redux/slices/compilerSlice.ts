import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    html: "",
    css: "",
    javascript: "",
};

const compilerSlice = createSlice({
    name: "compilerSlice",
    initialState,
    reducers: {}

});

export default compilerSlice.reducer