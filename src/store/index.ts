import { configureStore } from "@reduxjs/toolkit";
import { articlesApi } from "../service/articles-api";
import { registerApi } from "../service/register-api";

export const store = configureStore({
  reducer: {
    [articlesApi.reducerPath]: articlesApi.reducer,
    [registerApi.reducerPath]: registerApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articlesApi.middleware, registerApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
