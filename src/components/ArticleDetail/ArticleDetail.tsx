import { useLocation } from "react-router-dom";
import { ArticleState } from "../../types/articlesTypes";
import { Avatar, Button, Typography, Tag, Tooltip } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import Markdown from "react-markdown";

import classes from "./ArticleDetail.module.scss";

const ArticleDetailPage: React.FC = () => {
  const location = useLocation();
  const { article } = (location.state as ArticleState) || {};
  console.log(article);

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
                  <Tooltip title={el} destroyTooltipOnHide={true}>
                    {el}
                  </Tooltip>
                </Tag>
              ))}
            </div>
            <Typography.Paragraph className={`${classes.articleBodyDescription}`}>
              <Tooltip title={article?.description} destroyTooltipOnHide={true}>
                {article?.description}
              </Tooltip>
            </Typography.Paragraph>
          </div>
          <div className={`${classes.articleBodyAuthorData}`}>
            <div>
              <div className={`${classes.articleBodyAuthorDataName}`}>
                <Tooltip title={article?.author.username} destroyTooltipOnHide={true}>
                  {article?.author.username}
                </Tooltip>
              </div>
              <div className={`${classes.articleBodyAuthorDataDate}`}>March 5, 2020</div>
            </div>
            <Avatar src={article?.author.image} size={46} />
          </div>
        </div>
        <Typography.Paragraph className={`${classes.articleBodyText}`}>
          {<Markdown>{article?.body}</Markdown>}
        </Typography.Paragraph>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
