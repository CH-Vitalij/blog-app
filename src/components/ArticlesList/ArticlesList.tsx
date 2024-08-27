import { HeartOutlined } from "@ant-design/icons";
import { Avatar, List, Button, Typography, Tag } from "antd";
import classes from "./ArticlesList.module.scss";
import { useGetArticlesQuery } from "../../service/articles-api";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const ArticlesList = () => {
  const [pageNum, setPage] = useState(1);

  const {
    data = { articles: [], articlesCount: 0 },
    isFetching,
    isError,
  } = useGetArticlesQuery({ limit: "5", offset: (pageNum - 1) * 5 });

  console.log(isFetching);

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
            setPage(page);
          },
          current: pageNum,
          pageSize: 5,
          total: data.articlesCount,
          align: "center",
          hideOnSinglePage: true,
          showSizeChanger: false,
        }}
        dataSource={data.articles}
        renderItem={(item) => (
          <List.Item key={item.slug} className={`${classes.articlesItem}`}>
            <NavLink to={`articles/${item.slug}`} state={{ body: item.body }}>
              <div className={`${classes.articlesItemBody}`}>
                <div style={{ maxWidth: "682px" }}>
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
                  <div>
                    <Tag className={`${classes.articlesItemBodyTag}`}>{item.tagList[0]}</Tag>
                  </div>
                  <Typography.Paragraph className={`${classes.articlesItemBodyParagraph}`}>
                    {item.body}
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
            </NavLink>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ArticlesList;
