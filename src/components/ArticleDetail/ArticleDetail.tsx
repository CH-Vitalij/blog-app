import { useLocation, useParams } from "react-router-dom";
import { ArticleState } from "../../types/articlesTypes";
import { Avatar, Button, Typography, Tag } from "antd";
import { HeartOutlined } from "@ant-design/icons";

import Markdown from "react-markdown";

import classes from "./ArticleDetail.module.scss";
import { useGetArticlesQuery } from "../../service/api";

const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams();

  const location = useLocation();

  const state = location.state as ArticleState | undefined;
  const initialArticle = state ? state.article : undefined;
  console.log("initialArticle", initialArticle);

  const { data: fetchedArticle } = useGetArticlesQuery(
    {
      limit: "",
      offset: 0,
    },
    {
      selectFromResult: ({ data }) => ({
        data: data?.articles.find((item) => item.slug === slug),
      }),
      skip: initialArticle !== undefined,
    },
  );

  const article = initialArticle || fetchedArticle;

  console.log("article", article);

  if (!article) return <h1>Loading...</h1>;

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
            <div>
              <div className={`${classes.articleBodyAuthorDataName}`}>
                {article?.author.username}
              </div>
              <div className={`${classes.articleBodyAuthorDataDate}`}>March 5, 2020</div>
            </div>
            <Avatar src={article?.author.image} size={46} />
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
