import ImageLibraryPlugin from "./LibraryPlugin";

export default class ImageLibrary {
  constructor(options) {
    this.options = { ...options };
    this.editor = null;
    this.plugins = [ImageLibraryPlugin];
  }

  bindEditor = (editor) => {
    this.editor = editor;
  }

  type() {
    return "node";
  }

  name() {
    return "Image Library";
  }
}
