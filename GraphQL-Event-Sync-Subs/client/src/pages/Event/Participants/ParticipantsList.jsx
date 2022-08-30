import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Button, Divider, List } from 'antd';
import styles from './styles.module.css';
import { GET_PARTICIPANTS, PARTICIPANTS_SUBS } from '../queries';
import NewParticipantForm from './NewParticipantForm';

function Participants({ event }) {
  const [btnIsVisible, setBtnIsVisible] = useState(true);

  const [getParticipants, { called, loading, data, subscribeToMore }] = useLazyQuery(GET_PARTICIPANTS, {
    variables: { id: event },
  });

  useEffect(() => {
    if (!loading && called) {
      subscribeToMore({
        document: PARTICIPANTS_SUBS,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newItem = subscriptionData.data.participantCreated;
          return {
            event: {
              ...prev.event,
              participants: [...prev.event.participants, newItem],
            },
          };
        },
      });
    }
  }, [loading, called, subscribeToMore]);

  useEffect(() => {
    if (!loading && data) {
      setBtnIsVisible(false);
    }
  }, [loading, data]);

  return (
    <div>
      <Divider>⮟ Participants ⮟ </Divider>
      {btnIsVisible && (
        <div className={styles.showParticipantsBtn}>
          <Button loading={loading} onClick={() => getParticipants()}>
            Show Participants
          </Button>
        </div>
      )}
      {!loading && data && (
        <>
          <List
            itemLayout="horizontal"
            dataSource={data.event.participants}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta title={`User: ${item.user.username}`} description={`Email: ${item.user.email}`} />
              </List.Item>
            )}
          />
          <NewParticipantForm event={event} />
        </>
      )}
    </div>
  );
}

export default Participants;
