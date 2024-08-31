
import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { tags as t } from '@lezer/highlight';
import { draculaInit } from '@uiw/codemirror-theme-dracula';
import { loadLanguage, } from '@uiw/codemirror-extensions-langs';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { updateCodeValue } from "@/redux/slices/compilerSlice";


export default function CodeEditor() {

    const currentlanguage = useSelector(
        (state: RootState) => state.compilerSlice.currentLanguage
    );

    const fullCode = useSelector((state: RootState) => state.compilerSlice.fullCode);
    const dispatch = useDispatch()

    const onChange = React.useCallback((value: string) => {
        dispatch(updateCodeValue(value))
    }, []);

    return (
        <CodeMirror
            value={fullCode[currentlanguage]}
            height="cal(100vh - 60px - 50px)"
            className="code-editor"
            extensions={[loadLanguage(currentlanguage)!]}
            onChange={onChange}
            theme={draculaInit({
                settings: {
                    caret: '#c6c6c6',
                    fontFamily: 'monospace',
                },
                styles: [
                    { tag: t.comment, color: '#6272a4' },
                ]
            })}

        />
    );

}