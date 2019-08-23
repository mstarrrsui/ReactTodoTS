interface hnItemJSON {
  comment_text: string;
  title: string;
  author: string;
  created_at: string;
  objectID: string;
  url: string;
}

export interface HNItem {
  comments: string;
  title: string;
  author: string;
  createDate: string;
  objectId: string;
  url: string;
}

export function mapFromJSON(json: hnItemJSON): HNItem {
  return {
    comments: json.comment_text,
    title: json.title,
    author: json.author,
    createDate: json.created_at,
    objectId: json.objectID,
    url: json.url
  };
}
