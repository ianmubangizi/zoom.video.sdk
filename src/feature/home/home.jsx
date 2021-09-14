/* eslint-disable no-restricted-globals */
import React from "react";
import { Card } from "antd";
import { IconFont } from "../../component/icon-font";
import "./home.scss";

const { Meta } = Card;

const Home = (props) => {
  const { history } = props;

  const onCardClick = (type) => {
    history.push(`/${type}${location.search}`);
  };

  const featureList = [
    {
      key: "video",
      icon: "icon-meeting",
      title: "Audio, video and share",
      description:
        "Gallery Layout, Start/Stop Audio, Mute/Unmute, Start/Stop Video, Start/Stop Screen Share",
    },
    {
      key: "chat",
      icon: "icon-chat",
      title: "Session chat",
      description: "Session Chat, Chat Priviledge",
    },
    {
      key: "preview",
      icon: "icon-meeting",
      title: "Local Preview",
      description: "Audio and Video preview",
    },
  ];

  return (
    <div>
      <div className="home">
        <h1>Features</h1>
        <div className="feature-entry">
          {featureList.map((feature) => {
            const { key, icon, title, description } = feature;
            return (
              <Card
                cover={<IconFont style={{ fontSize: "72px" }} type={icon} />}
                hoverable
                style={{ width: 320 }}
                className="entry-item"
                key={key}
                onClick={() => onCardClick(key)}
              >
                <Meta title={title} description={description} />
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
