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
  favorite: boolean;
  favoritesCount: number;
  author: Author;
}

export interface ArticlesRequest {
  articles: Articles[];
  articlesCount: number;
}
