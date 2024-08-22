import { HeartOutlined } from "@ant-design/icons";
import { Avatar, List, Space } from "antd";
import { createElement } from "react";

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {createElement(icon)}
    {text}
  </Space>
);

const ArticlesList = () => {
  const data = Array.from({ length: 23 }).map((_, i) => ({
    href: "https://ant.design",
    title: "Some article title",
    avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
    description: "Tag",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    name: `User ${i}`, // Добавляем имя
    birthDate: `01/01/199${i % 10}`, // Добавляем дату рождения
  }));

  return (
    <div style={{ padding: "26px 251px 17px 251px" }}>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
          align: "center",
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            style={{
              marginBottom: "26px",
              backgroundColor: "#ffffff",
              boxShadow: "0px 4px 12px 0px #00000026",
              padding: "15px 14px 24px 16px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "85px",
                fontFamily: "Inter UI, sans-serif",
                fontWeight: "400",
                fontSize: "12px",
                lineHeight: "22px",
              }}
            >
              <div style={{ maxWidth: "682px" }}>
                <List.Item.Meta
                  title={
                    <>
                      <a
                        href={item.href}
                        style={{
                          display: "inline-block",
                          width: "160px",
                          height: "28px",
                          marginRight: "13px",
                          color: "#1890FF",
                          fontSize: "20px",
                          lineHeight: "28px",
                          fontWeight: "400",
                        }}
                      >
                        {item.title}
                      </a>
                      <IconText icon={HeartOutlined} text="15" key="list-vertical-like-o" />
                    </>
                  }
                  description={item.description}
                />
                <div>{item.content}</div>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div>{item.name}</div>
                  <div>{item.birthDate}</div>
                </div>
                <Avatar src={item.avatar} />
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ArticlesList;
