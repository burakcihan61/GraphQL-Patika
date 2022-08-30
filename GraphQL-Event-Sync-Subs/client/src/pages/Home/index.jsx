import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { List, Spin } from 'antd';
import { GET_EVENTS, EVENTS_SUBS } from './queries';
import styles from './styles.module.css';

function Home() {
  const { loading, error, data, subscribeToMore } = useQuery(GET_EVENTS);

  useEffect(() => {
    subscribeToMore({
      document: EVENTS_SUBS,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        return {
          events: [subscriptionData.data.eventCreated, ...prev.events],
        };
      },
    });
  }, [subscribeToMore]);

  if (loading || !data) {
    return (
      <div className={styles.loading}>
        <Spin delay={300} size="middle" tip="Loading..." />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={data.events}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta title={<Link to={`/event/${item._id}`}>{item.title}</Link>} description={`${item.desc.substring(0, 400)}...`} />
          </List.Item>
        )}
      />
    </div>
  );
}

export default Home;
