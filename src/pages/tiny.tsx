import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

const Tiny = () => {
  const [text, setText] = useState("");
  const [value, setValue] = useState(
    "<h1>Descrição da Vaga</h1><p>...</p><h1>Responsabilidades</h1><p>...</p><h1>Requisitos</h1><p>...</p><h1>Sobre o Time</h1><p>...</p>"
  );
  const test = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (test.current != null) test.current.innerHTML = text;
  }, [text]);

  return (
    <>
      <form action="">
        <Editor
          apiKey={process.env.NEXT_PUBLIC_API_KEY}
          value={value}
          init={{ menubar: false, skin: "oxide-dark", content_css: "dark" }}
          onInit={(evt, editor) => {
            setText(editor.getContent({ format: "html" }));
          }}
          onEditorChange={(newValue, editor) => {
            setValue(newValue);
            setText(editor.getContent({ format: "html" }));
          }}
          id="editor"
          plugins="lists"
          toolbar="undo redo | h1 h2 | bold italic | checklist numlist bullist indent outdent | removeformat"
        />
        <div ref={test} className="JobContainer">
          {text}
        </div>
      </form>
    </>
  );
};

export default Tiny;
