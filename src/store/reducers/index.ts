import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  articlesData: reducerArticlesData,
});

export type RootState = ReturnType<typeof rootReducer>;
