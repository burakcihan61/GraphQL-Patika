import { useSubscription } from '@apollo/client';
import { Avatar, Badge } from 'antd';
import styles from './styles.module.css';
import { GET_COUNT } from './queries';

function EventCounter() {
  const { loading, data } = useSubscription(GET_COUNT);
  return (
    <div className={styles.container}>
      <Badge count={loading ? '?' : data.eventCount} size="small">
        <Avatar shape="square">Events</Avatar>
      </Badge>
    </div>
  );
}

export default EventCounter;
