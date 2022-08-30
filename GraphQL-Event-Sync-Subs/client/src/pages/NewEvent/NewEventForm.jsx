import React from 'react';
import moment from 'moment';
import { Button, Form, Input, DatePicker, TimePicker, Select, message } from 'antd';
import { useQuery, useMutation } from '@apollo/client';
import styles from './styles.module.css';
import { GET_USERS, GET_LOCATIONS, NEW_EVENT } from './queries';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

function NewEventForm() {
  const { loading: users_loading, data: users_data } = useQuery(GET_USERS);
  const { loading: locations_loading, data: locations_data } = useQuery(GET_LOCATIONS);
  const [saveEvent, { loading }] = useMutation(NEW_EVENT);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      message.loading('Saving...', 8);
      await saveEvent({
        variables: {
          data: {
            title: values.title,
            desc: values.description,
            date: moment(values.datepicker).format('YYYY-MM-DD'),
            from: moment(values.timepicker[0]).format('HH:mm'),
            to: moment(values.timepicker[1]).format('HH:mm'),
            location: values.location,
            user: values.user,
          },
        },
      });
      message.destroy();
      message.success('Event saved!', 4);
      navigate('/');
    } catch (e) {
      console.log(e);
      message.destroy();
      message.error('Event not saved!', 6);
    }
  };

  return (
    <Form name="basic" initialValues={{ remember: true }} onFinish={handleSubmit} autoComplete="off">
      <Form.Item name="title">
        <Input disabled={loading} placeholder="Title" size="large" />
      </Form.Item>

      <Form.Item name="description">
        <Input.TextArea disabled={loading} rows={3} placeholder="Description" size="large" />
      </Form.Item>

      <Form.Item name="datepicker">
        <DatePicker disabled={loading} size="large" />
      </Form.Item>

      <Form.Item name="timepicker">
        <TimePicker.RangePicker disabled={loading} size="large" format="HH:mm" />
      </Form.Item>

      <Form.Item name="location">
        <Select
          disabled={locations_loading || loading}
          loading={locations_loading}
          showSearch
          placeholder="Select a location"
          optionFilterProp="children"
          filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
          size="large"
        >
          {!locations_loading &&
            locations_data &&
            locations_data.locations.map((location) => (
              <Option key={location._id} value={location._id}>
                {location.name}
              </Option>
            ))}
        </Select>
      </Form.Item>

      <Form.Item name="user">
        <Select
          disabled={users_loading || loading}
          loading={users_loading}
          showSearch
          placeholder="Select a user"
          optionFilterProp="children"
          filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
          size="large"
        >
          {!users_loading &&
            users_data &&
            users_data.users.map((user) => (
              <Option key={user._id} value={user._id}>
                {user.username}
              </Option>
            ))}
        </Select>
      </Form.Item>

      <Form.Item className={styles.buttons} size="large">
        <Button loading={loading} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default NewEventForm;
