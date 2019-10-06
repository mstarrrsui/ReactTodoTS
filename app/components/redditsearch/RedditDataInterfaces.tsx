export interface RedditArticleFields {
  id: string;
  url: string;
  title: string;
}

export interface RedditArticleData {
  data: RedditArticleFields;
}

export interface RedditSearchResponse {
  children: RedditArticleData[];
  errorMessage?: string;
}
