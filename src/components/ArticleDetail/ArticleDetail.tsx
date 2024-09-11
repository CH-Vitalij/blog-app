import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Button, Typography, Tag, Spin, Popconfirm } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import HeartIcon from "../HeartIcon";
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
import { format } from "date-fns";
import { enGB } from "date-fns/locale";

import Markdown from "react-markdown";
import classes from "./ArticleDetail.module.scss";
import avatar from "../../assets/img/avatar.svg";

const pic = "https://static.productionready.io/images/smiley-cyrus.jpg";

const ArticleDetailPage: React.FC = () => {
  const { auth } = useAuth();
  const token = getToken() as string;
  const { username } = useGetUserQuery(auth ? { token } : skipToken, {
    selectFromResult: ({ data }) => ({
      username: data?.user.username,
    }),
  });

  const { slug } = useParams();
  const navigate = useNavigate();

  const {
    data: fetchedArticle,
    isLoading: isLoadingArticle,
    isError: isErrorArticle,
    isSuccess,
  } = useGetArticleQuery({ slug: slug ?? "", token: auth ? token : undefined });

  const [deleteArticle, { isError: isErrorDeleteArticle }] = useDeleteArticleMutation();

  const handleDeleteArticle = async () => {
    try {
      await deleteArticle({ slug: slug ?? "", token }).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Failed to delete article:", err);
    }
  };

  const [addFavorite, { isError: isErrorAddFavorite }] = usePostFavoriteMutation();
  const [deleteFavorite, { isError: isErrorDeleteFavorite }] = useDeleteFavoriteMutation();

  const handleFavorite = async (isFavorited: boolean) => {
    try {
      if (isFavorited) {
        await deleteFavorite({ slug: slug ?? "", token });
      } else {
        await addFavorite({ slug: slug ?? "", token });
      }
    } catch (err) {
      console.error("Failed to favorite article:", err);
    }
  };

  if (isLoadingArticle) return <Spin size="large" tip="Loading" fullscreen />;
  if (isErrorArticle || isErrorAddFavorite || isErrorDeleteFavorite || isErrorDeleteArticle)
    return <h1>Sorry, something went wrong</h1>;
  if (!isSuccess) return null;

  const article = fetchedArticle.article;

  return (
    <div className={`${classes.article}`}>
      <div className={`${classes.articleBody}`}>
        <div className={`${classes.articleBodyHeader}`}>
          <div style={{ maxWidth: "635px" }}>
            <Typography.Title className={`${classes.articleBodyTitle}`} level={5}>
              {article.title}
            </Typography.Title>
            <Button
              className={`${classes.articleBodyBtn} ${classes.articleBodyBtnHeart}`}
              type="text"
              onClick={() => {
                void handleFavorite(article.favorited);
              }}
              icon={
                article.favorited ? (
                  <HeartIcon
                    className={`${classes.articleBodyBtnIcon} ${classes.articleBodyBtnIconFavorite}`}
                  />
                ) : (
                  <HeartOutlined className={`${classes.articleBodyBtnIcon}`} />
                )
              }
              disabled={!auth}
            >
              {article.favoritesCount}
            </Button>
            <div className={`${classes.articleBodyTagList}`}>
              {article.tagList.map((el: string, i: number) => (
                <Tag key={article.slug + i} className={`${classes.articleBodyTag}`}>
                  {el}
                </Tag>
              ))}
            </div>
            <Typography.Paragraph className={`${classes.articleBodyDescription}`}>
              {article.description}
            </Typography.Paragraph>
          </div>
          <div className={`${classes.articleBodyAuthorData}`}>
            <div style={{ flexGrow: 1 }}>
              <div className={`${classes.articleBodyAuthorDataName}`}>
                {article.author.username}
              </div>
              <div className={`${classes.articleBodyAuthorDataDate}`}>
                {format(new Date(article.createdAt), "MMMM d, yyyy", { locale: enGB })}
              </div>
            </div>
            <Avatar
              src={article.author.image !== pic ? article.author.image : avatar}
              size={46}
            />
            {username === article.author.username ? (
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
                <Button
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
              {article.body}
            </Markdown>
          }
        </Typography.Paragraph>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
