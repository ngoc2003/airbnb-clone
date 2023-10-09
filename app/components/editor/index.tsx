"use client";

import React from "react";
import { Editor } from "@tinymce/tinymce-react";

interface CustomEditorProps {
  handleSetDescription: (val: string) => void;
  initialValue?: string;
}
const CustomEditor = ({
  handleSetDescription,
  initialValue,
}: CustomEditorProps) => {
  return (
    <>
      <Editor
        apiKey={process.env.EDITOR_KEY}
        initialValue={initialValue}
        init={{
          setup: (editor) => {
            editor.on("change", (_) => {
              handleSetDescription(editor.getContent());
            });
          },
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </>
  );
};

export default CustomEditor;
