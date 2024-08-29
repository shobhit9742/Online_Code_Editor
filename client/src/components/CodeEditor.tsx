
import React from "react";
// import { javascript } from '@codemirror/lang-javascript';
import CodeMirror from "@uiw/react-codemirror";
import { tags as t } from '@lezer/highlight';
import { draculaInit } from '@uiw/codemirror-theme-dracula';
import { loadLanguage, langNames,} from '@uiw/codemirror-extensions-langs';

export default function CodeEditor() {

    console.log('langNames:', langNames);



    const [value, setValue] = React.useState("console.log('hello world!');");
    const onChange = React.useCallback((val: string) => {
        console.log('val:', val);
        setValue(val);
    }, []);
    return (
        <CodeMirror
            value={value}
            height="100vh"
            extensions={[loadLanguage('tsx')!]}
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