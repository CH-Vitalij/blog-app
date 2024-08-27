import { useLocation } from "react-router-dom";
import Markdown from "react-markdown";

interface ArticleState {
  body?: string;
}

const ArticleDetailPage: React.FC = () => {
  const location = useLocation();
  const { body } = (location.state as ArticleState) || {};

  return <div>{body && <Markdown>{body}</Markdown>}</div>;
};

export default ArticleDetailPage;
