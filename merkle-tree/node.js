import crypto from "crypto";

class Node {
  constructor(type, name, level, parent, id) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.level = level;
    this.parent = parent;
    this.content = "";
    this.children = [];
    if (type === "file")
      this.hash = crypto
        .createHash("sha256")
        .update({
          type,
          name,
          level,
          content: this.content,
        })
        .digest("hex");
    else this.hash = "";
    this.commitedHash = "";
    this.modified = false;
  }

  updateChildrenContent() {
    const childHashes = this.children.reduce(
      (previous, current) => (previous += current.hash),
      ""
    );
    this.hash = crypto.createHash("sha256").update(childHashes).digest("hex");
    this.parent?.updateChildrenContent();
  }

  addChild(node) {
    if (this.type !== "directory") return;
    this.children.push(node);
    const childHashes = this.children.reduce(
      (previous, current) => (previous += current.hash),
      ""
    );
    this.hash = crypto.createHash("sha256").update(childHashes).digest("hex");
  }

  setContent(content) {
    if (this.type !== "file") return;

    this.content = content;
    this.hash = crypto
      .createHash("sha256")
      .update(
        JSON.stringify({
          type: this.type,
          name: this.name,
          level: this.level,
          content: this.content,
        })
      )
      .digest("hex");

    this.parent.updateChildrenContent();
  }

  commit() {
    this.commitedHash = this.hash;
    this.modified = false;
    if (this.type === "directory") {
      this.children.forEach((child) => child.commit());
    }
  }
}

export default Node;
