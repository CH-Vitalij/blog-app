import { ArticlesRequest } from "../types/articlesTypes";

export default class ArticlesService {
  async getResource() {
    const response = await fetch("https://blog.kata.academy/api/articles");

    if (!response.ok) {
      throw new Error(`Could not fetch, received ${response.status}`);
    }

    const result = (await response.json()) as ArticlesRequest;

    return result;
  }

  async getArticles() {
    const result = await this.getResource();
    return result;
  }
}
