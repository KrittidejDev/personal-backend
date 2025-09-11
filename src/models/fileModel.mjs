export class File {
  constructor(filename, id, size, mimetype, webViewLink, webContentLink) {
    this.filename = filename;
    this.id = id;
    this.size = size;
    this.mimetype = mimetype;
    this.webViewLink = webViewLink;
    this.webContentLink = webContentLink;
    this.createdAt = new Date();
  }
}
