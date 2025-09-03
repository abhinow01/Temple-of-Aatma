import CKEditor from "ckeditor4-react";
import React from "react";

const CkEditor = ({ value, onChange, index }) => {
  return (
    <CKEditor
      onChange={(event, editor) => {
        console.log(index, "CKE log");
        if (index || index === 0) {
          onChange(index, event.editor.getData());
          return;
        }
        onChange(event.editor.getData());
      }}
      data={value}
    />
  );
};

export default CkEditor;
