import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Button, Typography, Tag, Spin, Popconfirm } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import {
  useDeleteArticleMutation,
  useDeleteFavoriteMutation,
  useGetArticleQuery,
  useGetUserQuery,
  usePostFavoriteMutation,
} from "../../service/api";
import { useAuth } from "../../hooks/useAuth";
import { getToken } from "../../features/token";
import { skipToken } from "@reduxjs/toolkit/query/react";

import Markdown from "react-markdown";
import classes from "./ArticleDetail.module.scss";

const ArticleDetailPage: React.FC = () => {
  const { auth } = useAuth();
  const token = getToken() as string;
  const { username } = useGetUserQuery(auth ? { token } : skipToken, {
    selectFromResult: ({ data }) => ({
      username: data?.user.username ?? null,
    }),
  });

  const { slug } = useParams();
  const navigate = useNavigate();

  const {
    data: fetchedArticle,
    isLoading: isLoadingArticle,
    isError: isErrorArticle,
  } = useGetArticleQuery({ slug: slug ?? "", token: auth ? token : undefined });

  const [deleteArticle] = useDeleteArticleMutation();

  const handleDeleteArticle = async () => {
    try {
      await deleteArticle({ slug: slug ?? "", token }).unwrap();
      console.log("Success to delete article");
      navigate("/");
    } catch (err) {
      console.error("Failed to delete article:", err);
    }
  };

  const [addFavorite] = usePostFavoriteMutation();
  const [deleteFavorite] = useDeleteFavoriteMutation();

  const handleFavorite = async (isFavorited: boolean) => {
    console.log("isFavorited", isFavorited);

    try {
      if (isFavorited) {
        await deleteFavorite({ slug: slug ?? "", token });
        console.log("Success to deleteFavorite article");
      } else {
        await addFavorite({ slug: slug ?? "", token });
        console.log("Success to addFavorite article");
      }
    } catch (err) {
      console.log("Failed to favorite article:", err);
    }
  };

  if (isLoadingArticle) return <Spin size="large" tip="Loading" fullscreen />;
  if (isErrorArticle) return <h1>Sorry, something went wrong</h1>;

  const article = fetchedArticle?.article;
  console.log("article", fetchedArticle);

  return (
    <div className={`${classes.article}`}>
      <div className={`${classes.articleBody}`}>
        <div className={`${classes.articleBodyHeader}`}>
          <div style={{ maxWidth: "635px" }}>
            <Typography.Title className={`${classes.articleBodyTitle}`} level={5}>
              {article?.title}
            </Typography.Title>
            <Button
              className={`${classes.articleBodyBtn} ${classes.articleBodyBtnHeart} ${
                article?.favorited ? classes.articleBodyBtnHeartFavorite : ""
              }`}
              type="text"
              onClick={() => {
                void handleFavorite(article?.favorited as boolean);
              }}
              icon={
                <HeartOutlined
                  className={`${classes.articleBodyBtnIcon}`}
                  style={{ fontSize: "16px" }}
                />
              }
              disabled={!auth}
            >
              {article?.favoritesCount}
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
                <Popconfirm
                  title=""
                  description="Are you sure to delete this article?"
                  onConfirm={() => {
                    void handleDeleteArticle();
                  }}
                  okText="Yes"
                  cancelText="No"
                  placement="rightTop"
                >
                  <Button className={`${classes.articleBodyBtn} ${classes.articleBodyBtnDelete}`}>
                    Delete
                  </Button>
                </Popconfirm>
                <Button // сделать Link
                  className={`${classes.articleBodyBtn} ${classes.articleBodyBtnEdit}`}
                  onClick={() => {
                    navigate("edit");
                  }}
                >
                  Edit
                </Button>
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
