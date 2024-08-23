import { HeartOutlined } from "@ant-design/icons";
import { Avatar, List, Button, Typography, Tag } from "antd";
import classes from "./ArticlesList.module.scss";

const ArticlesList = () => {
  const data = Array.from({ length: 25 }).map((_, i) => ({
    title: "Some article title",
    avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
    description: "Tag1",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    name: "John Doe",
    birthDate: "March 5, 2020",
  }));

  return (
    <div style={{ padding: "26px 251px 17px 251px" }}>
      <List
        className={`${classes.articles}`}
        itemLayout="vertical"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
          align: "center",
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.title} className={`${classes.articlesItem}`}>
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
                  <Tag className={`${classes.articlesItemBodyTag}`}>{item.description}</Tag>
                </div>
                <Typography.Paragraph className={`${classes.articlesItemBodyParagraph}`}>
                  {item.content}
                </Typography.Paragraph>
              </div>
              <div className={`${classes.articlesItemBodyAuthorData}`}>
                <div>
                  <div className={`${classes.articlesItemBodyAuthorDataName}`}>{item.name}</div>
                  <div className={`${classes.articlesItemBodyAuthorDataDate}`}>
                    {item.birthDate}
                  </div>
                </div>
                <Avatar src={item.avatar} size={46} />
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ArticlesList;
