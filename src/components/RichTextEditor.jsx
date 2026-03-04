import { useRef, useEffect } from 'react';

export default function RichTextEditor({ value, onChange, placeholder }) {
    const editorRef = useRef(null);

    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value || '';
        }
    }, [value]);

    const execCommand = (command) => {
        document.execCommand(command, false, null);
        onChange(editorRef.current.innerHTML);
    };

    const handleInput = () => {
        onChange(editorRef.current.innerHTML);
    };

    return (
        <div className="rich-editor-container">
            <div className="rich-editor-toolbar">
                <button type="button" onClick={() => execCommand('bold')} title="Bold"><b>B</b></button>
                <button type="button" onClick={() => execCommand('italic')} title="Italic"><i>I</i></button>
                <button type="button" onClick={() => execCommand('underline')} title="Underline"><u>U</u></button>
                <div className="divider"></div>
                <button type="button" onClick={() => execCommand('insertUnorderedList')} title="Bullet List">• list</button>
                <button type="button" onClick={() => execCommand('insertOrderedList')} title="Numbered List">1. list</button>
            </div>
            <div
                ref={editorRef}
                contentEditable
                className="rich-editor-content"
                onInput={handleInput}
                data-placeholder={placeholder || 'Enter text...'}
            ></div>
        </div>
    );
}
