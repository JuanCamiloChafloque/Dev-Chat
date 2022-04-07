import React, { useState, useEffect } from "react";
import {
  Segment,
  Accordion,
  Header,
  Icon,
  Image,
  List,
} from "semantic-ui-react";

const MetaPanel = ({ isPrivate, channel, messages }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [posters, setPosters] = useState({});

  useEffect(() => {
    const topPosters = () => {
      if (messages) {
        const posters = messages.reduce((acc, message) => {
          if (message.user.name in acc) {
            acc[message.user.name].count += 1;
          } else {
            acc[message.user.name] = {
              avatar: message.user.avatar,
              count: 1,
            };
          }
          return acc;
        }, {});
        setPosters(posters);
      }
    };
    topPosters();
  }, [messages]);

  const setActiveHandler = (prevState) => {
    if (activeIndex === prevState) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(prevState);
    }
  };

  return (
    <>
      {isPrivate ? (
        <></>
      ) : (
        <Segment loading={!channel}>
          <Header as="h3" attached="top">
            About # {channel && channel.name}
          </Header>
          <Accordion styled attached="true">
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              onClick={() => setActiveHandler(0)}
            >
              <Icon name="dropdown" />
              <Icon name="info" />
              Channel Details
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              {channel && channel.details}
            </Accordion.Content>
            <Accordion.Title
              active={activeIndex === 1}
              index={1}
              onClick={() => setActiveHandler(1)}
            >
              <Icon name="dropdown" />
              <Icon name="user circle" />
              Top Posters
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 1}>
              <List>
                {posters &&
                  Object.entries(posters)
                    .sort((a, b) => b[1] - a[1])
                    .map(([key, val], i) => (
                      <List.Item key={i}>
                        <Image avatar src={val.avatar} />
                        <List.Content>
                          <List.Header as="a">{key}</List.Header>
                          <List.Description>{val.count} posts</List.Description>
                        </List.Content>
                      </List.Item>
                    ))
                    .slice(0, 5)}
              </List>
            </Accordion.Content>

            <Accordion.Title
              active={activeIndex === 2}
              index={2}
              onClick={() => setActiveHandler(2)}
            >
              <Icon name="dropdown" />
              <Icon name="pencil alternate" />
              Created By
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 2}>
              <Header as="h3">
                <Image circular src={channel && channel.createdBy.avatar} />
                {channel && channel.createdBy.name}
              </Header>
            </Accordion.Content>
          </Accordion>
        </Segment>
      )}
    </>
  );
};

export default MetaPanel;
