interface IAuthor {
  username: string;
  bio: string;
  image: string | null;
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

export interface IArticlesResponse {
  articles: IArticles[];
  articlesCount: number;
}

export interface IArticleResponse {
  article: IArticles;
}

type TagObject = {
  tag: string;
};

export interface IArticleFormInput {
  title: string;
  description: string;
  body: string;
  newTag: string;
  tagList: TagObject[];
}

export interface IArticleFormRequest {
  article: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  };
}

export interface ArticleFormProps {
  type?: string;
  legend?: string;
}
