interface Author {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface Articles {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Author;
}

export interface ArticleState {
  article?: Articles;
}

export interface ArticlesResponse {
  articles: Articles[];
  articlesCount: number;
}

export interface ArticleResponse {
  article: Articles;
}
