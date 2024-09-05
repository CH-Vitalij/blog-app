interface IAuthor {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface IArticles {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: IAuthor;
}

export interface IArticleState {
  article?: IArticles;
}

export interface IArticlesResponse {
  articles: IArticles[];
  articlesCount: number;
}

export interface IArticleResponse {
  article: IArticles;
}

export interface ICreateArticleFormInput {
  title: string;
  description: string;
  body: string;
  valueTag: string;
  tagList: { value: string }[];
}

export interface ICreateArticleRequest {
  article: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  };
}
