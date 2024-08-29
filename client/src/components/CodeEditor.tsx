
import React from "react";
import { javascript } from '@codemirror/lang-javascript';
import CodeMirror from "@uiw/react-codemirror";

export default function CodeEditor() {
    const [value, setValue] = React.useState("console.log('hello world!');");
    const onChange = React.useCallback((val: any) => {
        console.log('val:', val);
        setValue(val);
    }, []);
    return (
        <CodeMirror
            value={value} 
            height="100vh"
            extensions={[javascript({ jsx: true })]}
            onChange={onChange} />
    );

}