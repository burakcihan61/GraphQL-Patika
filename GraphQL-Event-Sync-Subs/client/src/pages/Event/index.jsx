import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Spin, Divider } from 'antd';
import { GET_EVENT } from './queries';
import Participants from './Participants/ParticipantsList';

function Event() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_EVENT, {
    variables: {
      id,
    },
  });

  if (loading || !data) {
    return (
      <div className="loading">
        <Spin delay={300} size="middle" tip="Loading..." />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <span style={{ float: 'left' }}>
        <b>Date:</b> {data.event.date}
      </span>
      <span style={{ float: 'right' }}>
        <b>Time:</b> {data.event.from}-{data.event.to}
      </span>
      <Divider />
      <h2>{data.event.title}</h2>
      <p>{data.event.desc}</p>

      <Divider orientationMargin="0" orientation="left">
        Location: {data.event.location.name}
      </Divider>
      <p>{data.event.location.desc}</p>
      <Participants event={id} />
    </div>
  );
}

export default Event;
