import React from "react";
import { Avatar, List } from "antd";
import { useQuery } from "@apollo/client";
import Loading from "../../Loading/Loading";
import { GET_EVENTS } from "./queries";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Home = () => {
  const { loading, error, data } = useQuery(GET_EVENTS);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error : {error.message}</div>;
  }

  return (
    <div>
      <List
        className="demo-loadmore-list"
        loading={false}
        itemLayout="horizontal"
        // loadMore={loadMore}
        dataSource={data.events}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.users[0].profile_photo} />}
              title={
                <Link to={`/post/${item.id}`} className={styles.listTitle}>
                  {item.title}
                </Link>
              }
              description={
                <Link to={`/post/${item.id}`} className={styles.listItem}>
                  {item.desc}
                </Link>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Home;
