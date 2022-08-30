import { useRef } from 'react';
import { Button, Form, Select, message, Divider } from 'antd';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS, NEW_PARTICIPANT } from '../queries';
import styles from './styles.module.css';

const { Option } = Select;

function NewParticipantForm(event) {
  const { loading: users_loading, data: users_data } = useQuery(GET_USERS);
  const [saveParticipant, { loading }] = useMutation(NEW_PARTICIPANT);

  const formRef = useRef();

  const handleSubmit = async (values) => {
    try {
      message.loading('Adding...', 8);
      await saveParticipant({
        variables: {
          data: {
            ...values,
            event: event.event,
          },
        },
      });
      message.destroy();
      message.success('Participant added!', 4);
      formRef.current.resetFields();
    } catch (e) {
      console.log(e);
      message.destroy();
      message.error('Participant not added!', 6);
    }
  };

  return (
    <Form name="basic" className={styles.formCenter} initialValues={{ remember: true }} layout="inline" ref={formRef} onFinish={handleSubmit} autoComplete="off">
      <Divider>⮟ New Participant ⮟ </Divider>
      <Form.Item name="user">
        <Select
          disabled={users_loading || loading}
          loading={users_loading}
          showSearch
          placeholder="Select a user"
          optionFilterProp="children"
          filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
          style={{ width: 200 }}
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
          Add
        </Button>
      </Form.Item>
    </Form>
  );
}

export default NewParticipantForm;
