import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IArticleState } from "../../types/articlesTypes";
import { Avatar, Button, Typography, Tag } from "antd";
import { HeartOutlined } from "@ant-design/icons";

import Markdown from "react-markdown";

import classes from "./ArticleDetail.module.scss";
import { useDeleteArticleMutation, useGetArticleQuery, useGetUserQuery } from "../../service/api";
import { useAuth } from "../../hooks/useAuth";
import { getToken } from "../../features/token";
import { skipToken } from "@reduxjs/toolkit/query/react";

const ArticleDetailPage: React.FC = () => {
  const { auth } = useAuth();
  const token = getToken() as string;
  const { username } = useGetUserQuery(auth ? { token } : skipToken, {
    selectFromResult: ({ data }) => ({
      username: data?.user.username ?? null,
    }),
  });

  console.log("fetchUsername", username);

  const { slug } = useParams();
  const navigate = useNavigate();

  const location = useLocation();

  const state = location.state as IArticleState | undefined;
  const initialArticle = state ? state.article : undefined;
  console.log("initialArticle", initialArticle);

  const {
    data: fetchedArticle,
    isLoading,
    isError,
    error,
  } = useGetArticleQuery(
    {
      slug: slug || "",
    },
    {
      skip: initialArticle !== undefined || !slug,
    },
  );

  const [deleteArticle] = useDeleteArticleMutation();

  const handleDeleteArticle = async () => {
    try {
      await deleteArticle({ slug, token });
      console.log("Succcess to delete article");
      navigate("/");
    } catch (err) {
      console.error("Failed to delete article:", err);
    }
  };

  console.log("fetchedArticle", fetchedArticle);

  const article = initialArticle || fetchedArticle?.article;

  console.log("article", article);
  console.log("error", error);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Sorry, something went wrong</h1>;

  return (
    <div className={`${classes.article}`}>
      <div className={`${classes.articleBody}`}>
        <div className={`${classes.articleBodyHeader}`}>
          <div style={{ maxWidth: "635px" }}>
            <Typography.Title className={`${classes.articleBodyTitle}`} level={5}>
              {article?.title}
            </Typography.Title>
            <Button
              className={`${classes.articleBodyBtn}`}
              type="text"
              icon={
                <HeartOutlined
                  className={`${classes.articleBodyBtnIcon}`}
                  style={{ fontSize: "16px" }}
                />
              }
            >
              12
            </Button>
            <div className={`${classes.articleBodyTagList}`}>
              {article?.tagList.map((el: string, i: number) => (
                <Tag key={article?.slug + i} className={`${classes.articleBodyTag}`}>
                  {el}
                </Tag>
              ))}
            </div>
            <Typography.Paragraph className={`${classes.articleBodyDescription}`}>
              {article?.description}
            </Typography.Paragraph>
          </div>
          <div className={`${classes.articleBodyAuthorData}`}>
            <div style={{ flexGrow: 1 }}>
              <div className={`${classes.articleBodyAuthorDataName}`}>
                {article?.author.username}
              </div>
              <div className={`${classes.articleBodyAuthorDataDate}`}>March 5, 2020</div>
            </div>
            <Avatar src={article?.author.image} size={46} />
            {username === article?.author.username ? (
              <div>
                <Button onClick={handleDeleteArticle}>Delete</Button>
                <Button>Edit</Button>
              </div>
            ) : null}
          </div>
        </div>
        <Typography.Paragraph className={`${classes.articleBodyText}`}>
          {
            <Markdown
              components={{
                img: ({ ...props }) => <img {...props} className={`${classes.image}`} alt="" />,
              }}
            >
              {article?.body}
            </Markdown>
          }
        </Typography.Paragraph>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
