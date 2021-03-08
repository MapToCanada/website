import React from "react";
import Editor from "rich-markdown-editor";

import { uploadImage } from "../ajax";
import { MEDIA_STATIC } from "@admin/constant/apis";

// plugins TODO: image library browser
// import ImageLibrary from "./EditorPlugins/ImageLibrary";
// import { PictureOutlined } from "@ant-design/icons";
// import LibraryComponent from "./EditorPlugins/Component";

class MarkdownEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Editor
          {...this.props}
          // extensions={[new ImageLibrary()]}
          uploadImage={async (file) => {
            const result = await uploadImage(file);

            return new Promise((resolve) => {
              resolve(MEDIA_STATIC(result));
            });
          }}
          // embeds={[
          //   {
          //     title: "Google Doc",
          //     keywords: "google docs gdocs",
          //     icon: <PictureOutlined />,
          //     defaultHidden: false,
          //     matcher: (href) => href.matches(/docs.google.com/i),
          //     component: LibraryComponent,
          //   },
          // ]}
        />
      </div>
    );
  }
}

export default MarkdownEditor;
