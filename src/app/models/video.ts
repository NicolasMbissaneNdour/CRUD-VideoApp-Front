export class Video {
  _id: String;
  title: String;
  link: String;
  user_id: String;

  constructor(id: String,title: String,link: String,user_id: String) {
    this._id = id;
    this.title = title;
    this.link = link;
    this.user_id = user_id;
  }
}
