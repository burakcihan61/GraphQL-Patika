import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_EVENT } from "./queries";
import Loading from "../../Loading/Loading";
import { Typography, Image } from "antd";

const Post = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_EVENT, {
    variables: {
      id,
    },
  });
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error : {error.message}</div>;
  }
  const { Title } = Typography;

  console.log(data);
  const { event } = data;
  return (
    <>
      <Title level={2}>{event.title}</Title>
      <Image src={event.cover} />
      <div>{event.desc}</div>
    </>
  );
};

export default Post;
