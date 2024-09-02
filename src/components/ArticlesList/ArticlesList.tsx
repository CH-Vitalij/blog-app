import { HeartOutlined } from "@ant-design/icons";
import { Avatar, List, Button, Typography, Tag, Tooltip, Spin } from "antd";
import classes from "./ArticlesList.module.scss";
import { useGetArticlesQuery } from "../../service/api";
import { useSearchParams, Link, useLocation, Location } from "react-router-dom";

interface LocationStateHeader {
  userData: {
    username: string;
    email: string;
    token: string;
  };
}

const ArticlesList = () => {
  const location = useLocation() as Location<LocationStateHeader>;
  const [searchParams, setSearchParams] = useSearchParams();

  const articlesQuery = Number(searchParams.get("articles")) || 1;

  const { data, isLoading, isSuccess, isFetching, isError } = useGetArticlesQuery({
    limit: "5",
    offset: (articlesQuery - 1) * 5,
  });

  if (isLoading) return <Spin size="large" fullscreen />;
  if (isError) return <h1>Error!!!</h1>;
  if (!isSuccess) return null;

  console.log("data", data);

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
        total: data.articlesCount,
        align: "center",
        hideOnSinglePage: true,
        showSizeChanger: false,
      }}
      dataSource={data.articles}
      renderItem={(item) => (
        <List.Item key={item.slug} className={`${classes.articlesItem}`}>
          <div className={`${classes.articlesItemBody}`}>
            <div style={{ maxWidth: "635px" }}>
              <Link to={`articles/${item.slug}`} state={{ article: item, userData: location.state?.userData }}>
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
                className={`${classes.articlesItemBodyBtn}`}
                type="text"
                icon={
                  <HeartOutlined
                    className={`${classes.articlesItemBodyBtnIcon}`}
                    style={{ fontSize: "16px" }}
                  />
                }
                disabled
              >
                12
              </Button>
              <div style={{ display: "flex", gap: "8px" }}>
                {item.tagList.map((el: string, i: number) => (
                  <Tag key={item.slug + i} className={`${classes.articlesItemBodyTag}`}>
                    <Tooltip title={el} destroyTooltipOnHide={true}>
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
                    placement: "rightBottom",
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
              <Avatar src={item.author.image} size={46} />
            </div>
          </div>
        </List.Item>
      )}
    />
  );
};

export default ArticlesList;
