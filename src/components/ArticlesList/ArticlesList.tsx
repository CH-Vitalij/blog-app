import { HeartOutlined } from "@ant-design/icons";
import { Avatar, List, Button, Typography, Tag, Tooltip } from "antd";
import {
  useDeleteFavoriteMutation,
  useGetArticlesQuery,
  usePostFavoriteMutation,
} from "../../service/api";
import { useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getToken } from "../../features/token";
import { IArticles } from "../../types/articlesTypes";

import HeartIcon from "../HeartIcon";
import classes from "./ArticlesList.module.scss";
import avatar from "../../assets/img/avatar.svg";
const pic = "https://static.productionready.io/images/smiley-cyrus.jpg";

const ArticlesList = () => {
  const { auth } = useAuth();
  const token = getToken() as string;
  const [searchParams, setSearchParams] = useSearchParams();

  const articlesQuery = Number(searchParams.get("articles")) || 1;

  const {
    data: articles,
    isSuccess,
    isFetching,
    isError: isErrorArticles,
  } = useGetArticlesQuery({
    limit: "5",
    offset: (articlesQuery - 1) * 5,
    token: auth ? token : undefined,
  });

  const [addFavorite, { isError: isErrorAddFavorite }] = usePostFavoriteMutation();
  const [deleteFavorite, { isError: isErrorDeleteFavorite }] = useDeleteFavoriteMutation();

  const handleFavorite = async (article: IArticles) => {
    try {
      if (article.favorited) {
        await deleteFavorite({ slug: article.slug ?? "", token });
      } else {
        await addFavorite({ slug: article.slug ?? "", token });
      }
    } catch (err) {
      console.error("Failed to favorite article:", err);
    }
  };

  if (isErrorArticles || isErrorAddFavorite || isErrorDeleteFavorite)
    return <h1>Sorry, something went wrong</h1>;
  if (!isSuccess) return null;

  return (
    <List
      className={`${classes.articles}`}
      itemLayout="vertical"
      loading={{ spinning: isFetching, size: "large" }}
      pagination={{
        onChange: (page) => {
          setSearchParams({ articles: String(page) });
        },
        current: articlesQuery,
        pageSize: 5,
        total: articles.articlesCount,
        align: "center",
        hideOnSinglePage: true,
        showSizeChanger: false,
      }}
      dataSource={articles.articles}
      renderItem={(item) => (
        <List.Item key={item.slug} className={`${classes.articlesItem}`}>
          <div className={`${classes.articlesItemBody}`}>
            <div style={{ maxWidth: "635px" }}>
              <Link to={`articles/${item.slug}`}>
                <Typography.Title
                  className={`${classes.articlesItemBodyTitle}`}
                  level={5}
                  ellipsis={{
                    rows: 1,
                    tooltip: {
                      title: item.description,
                      destroyTooltipOnHide: true,
                      placement: "rightBottom",
                      color: "rgb(0, 152, 255, 0.85)",
                    },
                  }}
                >
                  {item.title}
                </Typography.Title>
              </Link>
              <Button
                className={`${classes.articlesItemBodyBtn} ${classes.articlesItemBodyBtnHeart}`}
                type="text"
                onClick={() => {
                  void handleFavorite(item);
                }}
                icon={
                  item?.favorited ? (
                    <HeartIcon
                      className={`${classes.articlesItemBodyBtnIcon} ${classes.articlesItemBodyBtnIconFavorite}`}
                    />
                  ) : (
                    <HeartOutlined className={`${classes.articlesItemBodyBtnIcon}`} />
                  )
                }
                disabled={!auth}
              >
                {item.favoritesCount}
              </Button>
              <div style={{ display: "flex", gap: "8px" }}>
                {item.tagList.map((el: string, i: number) => (
                  <Tag key={item.slug + i} className={`${classes.articlesItemBodyTag}`}>
                    <Tooltip
                      title={el}
                      destroyTooltipOnHide={true}
                      color="rgb(0, 152, 255, 0.85)"
                      placement="bottomLeft"
                    >
                      {el}
                    </Tooltip>
                  </Tag>
                ))}
              </div>
              <Typography.Paragraph
                className={`${classes.articlesItemBodyDescription}`}
                ellipsis={{
                  rows: 2,
                  tooltip: {
                    title: item.description,
                    destroyTooltipOnHide: true,
                    placement: "bottom",
                    color: "rgb(0, 152, 255, 0.85)",
                  },
                }}
              >
                {item.description}
              </Typography.Paragraph>
            </div>
            <div className={`${classes.articlesItemBodyAuthorData}`}>
              <div>
                <div className={`${classes.articlesItemBodyAuthorDataName}`}>
                  {item.author.username}
                </div>
                <div className={`${classes.articlesItemBodyAuthorDataDate}`}>March 5, 2020</div>
              </div>
              <Avatar src={item.author.image !== pic ? item.author.image : avatar} size={46} />
            </div>
          </div>
        </List.Item>
      )}
    />
  );
};

export default ArticlesList;
