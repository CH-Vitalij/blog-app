import { HeartOutlined } from "@ant-design/icons";
import { Avatar, List, Button, Typography, Tag, Tooltip } from "antd";
import classes from "./ArticlesList.module.scss";
import { useGetArticlesQuery } from "../../service/articles-api";
import { useSearchParams, Link } from "react-router-dom";

const ArticlesList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const articlesQuery = Number(searchParams.get("articles")) || 1;

  const {
    data = { articles: [], articlesCount: 0 },
    isFetching,
    isError,
  } = useGetArticlesQuery({ limit: "5", offset: (articlesQuery - 1) * 5 });

  if (isFetching) return <h1>Loading...</h1>;

  if (isError) return <h1>Error!!!</h1>;

  console.log("data", data);

  return (
    <div style={{ padding: "26px 251px 17px 251px" }}>
      <List
        className={`${classes.articles}`}
        itemLayout="vertical"
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
            <Link to={`articles/${item.slug}`} state={{ article: item }}>
              <div className={`${classes.articlesItemBody}`}>
                <div style={{ maxWidth: "635px" }}>
                  <Typography.Title className={`${classes.articlesItemBodyTitle}`} level={5}>
                    {item.title}
                  </Typography.Title>
                  <Button
                    className={`${classes.articlesItemBodyBtn}`}
                    type="text"
                    icon={
                      <HeartOutlined
                        className={`${classes.articlesItemBodyBtnIcon}`}
                        style={{ fontSize: "16px" }}
                      />
                    }
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
                  <Typography.Paragraph className={`${classes.articlesItemBodyDescription}`}>
                    <Tooltip title={item.description} destroyTooltipOnHide={true}>
                      {item.description}
                    </Tooltip>
                  </Typography.Paragraph>
                </div>
                <div className={`${classes.articlesItemBodyAuthorData}`}>
                  <div>
                    <div className={`${classes.articlesItemBodyAuthorDataName}`}>
                      <Tooltip title={item.author.username} destroyTooltipOnHide={true}>
                        {item.author.username}
                      </Tooltip>
                    </div>
                    <div className={`${classes.articlesItemBodyAuthorDataDate}`}>March 5, 2020</div>
                  </div>
                  <Avatar src={item.author.image} size={46} />
                </div>
              </div>
            </Link>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ArticlesList;
