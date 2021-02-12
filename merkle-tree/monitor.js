class Monitor {
  compare(node) {
    if (node.hash !== node.commitedHash) {
      console.log(node);
      node.modified = true;
      if (node.type === "directory") {
        node.children.forEach((node) => this.compare(node));
      }
    }
  }
}

export default new Monitor();
