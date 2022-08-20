import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

const BlogEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 2,
        boxShadow: "inset 0px 1px 8px -3px #ABABAB",
        backgroundColor: "#fefefe",
        width: "80%",
        height: "70vh",
        margin: "auto",
      }}
    >
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={setEditorState}
      />
    </div>
  );
};

export default BlogEditor;
