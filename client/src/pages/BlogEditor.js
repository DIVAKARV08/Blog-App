import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import axios from "axios";
// 6c03b05556065e8

const uploadImageCallBack = (file) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://api.cloudinary.com/v1_1/deu9uhlba/image/upload");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "iix6czal");
    xhr.send(formData);
    xhr.addEventListener("load", () => {
      const response = JSON.parse(xhr.responseText);
      //   console.log(response.url);
      resolve({ data: { link: response.url } });
    });
    xhr.addEventListener("error", () => {
      const error = JSON.parse(xhr.responseText);
      console.log(error);
      reject(error);
    });
  });
};

const BlogEditor = ({ setBlogContent }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  return (
    <div>
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
        className="overflow-scroll"
      >
        <Editor
          editorState={editorState}
          toolbarClassName="rdw-storybook-toolbar"
          wrapperClassName="rdw-storybook-wrapper"
          editorClassName="rdw-storybook-editor"
          onEditorStateChange={(newState) => {
            setEditorState(newState);
            setBlogContent(
              draftToHtml(convertToRaw(editorState.getCurrentContent()))
            );
          }}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: {
              uploadCallback: uploadImageCallBack,
              previewImage: true,
            },
          }}
        />
      </div>
    </div>
  );
};

export default BlogEditor;
