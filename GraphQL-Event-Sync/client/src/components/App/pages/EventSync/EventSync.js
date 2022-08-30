import React, { useState } from "react";
import { Button, Form, Input, Divider, List, Skeleton } from "antd";
import { useQuery, gql } from "@apollo/client";

import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../../Loading/Loading";

const GET_EVENTS_SYNC = gql`
  query events {
    eventsyncs {
      id
      title
      desc
      date
    }
  }
`;

const EventSync = () => {
  const [formLayout, setFormLayout] = useState("horizontal");
  const [form] = Form.useForm();

  const { loading, error, data } = useQuery(GET_EVENTS_SYNC);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error : {error.message}</div>;
  }
  const { eventsyncs } = data;

  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

  const formItemLayout =
    formLayout === "horizontal"
      ? {
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 14,
          },
        }
      : null;
  const buttonItemLayout =
    formLayout === "horizontal"
      ? {
          wrapperCol: {
            span: 14,
            offset: 4,
          },
        }
      : null;

  return (
    <>
      <Form
        {...formItemLayout}
        layout={formLayout}
        form={form}
        initialValues={{
          layout: formLayout,
        }}
        onValuesChange={onFormLayoutChange}
      >
        <Form.Item label="Title">
          <Input placeholder="Enter event title" />
        </Form.Item>
        <Form.Item label="Description">
          <Input placeholder="Enter event descripton" />
        </Form.Item>
        <Form.Item label="Event Date">
          <Input placeholder="Enter date in the format mm.dd.yyyy" />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button type="primary">Add Event</Button>
        </Form.Item>
      </Form>
      <div
        id="scrollableDiv"
        style={{
          height: 400,
          overflow: "auto",
          padding: "0 16px",
          border: "1px solid rgba(140, 140, 140, 0.35)",
        }}
      >
        <InfiniteScroll
          dataLength={eventsyncs.length}
          next={eventsyncs}
          hasMore={eventsyncs.length < 50}
          loader={
            <Skeleton
              avatar
              paragraph={{
                rows: 1,
              }}
              active
            />
          }
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={data.eventsyncs}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <List.Item.Meta title={item.title} description={item.desc} />
                <div>{item.date}</div>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </>
  );
};

export default EventSync;
