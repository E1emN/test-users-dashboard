import {
  Avatar,
  Card,
  Col,
  Descriptions,
  Divider,
  Flex,
  Row,
  Tag,
  Typography,
} from 'antd';
import { useUnit } from 'effector-react';
import { $user, $isUserLoading } from '@/model/user';
import { NotFound } from '../not-found/not-found';

const { Title, Text } = Typography;

export const UserDetails = () => {
  const user = useUnit($user);
  const isLoading = useUnit($isUserLoading);

  if (isLoading) {
    return <Typography.Text>loading...</Typography.Text>;
  }

  if (!user) {
    return <NotFound />;
  }

  return (
    <Flex className='container' vertical gap={24}>
      <Card>
        <Flex align='center' gap={24}>
          <Avatar size={120} src={user.image} />

          <Flex vertical gap={4}>
            <Title level={2} style={{ margin: 0 }}>
              {user.firstName} {user.lastName}
            </Title>

            <Text type='secondary'>@{user.username}</Text>

            <Flex gap={8} wrap>
              <Tag color='blue'>{user.gender}</Tag>
              <Tag color='purple'>{user.role}</Tag>
              <Tag color='green'>{user.age} years old</Tag>
            </Flex>
          </Flex>
        </Flex>
      </Card>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card title='Personal Information'>
            <Descriptions column={1} bordered size='small'>
              <Descriptions.Item label='Email'>{user.email}</Descriptions.Item>

              <Descriptions.Item label='Phone'>{user.phone}</Descriptions.Item>

              <Descriptions.Item label='Birth Date'>
                {user.birthDate}
              </Descriptions.Item>

              <Descriptions.Item label='Blood Group'>
                {user.bloodGroup}
              </Descriptions.Item>

              <Descriptions.Item label='Height'>
                {user.height} cm
              </Descriptions.Item>

              <Descriptions.Item label='Weight'>
                {user.weight} kg
              </Descriptions.Item>

              <Descriptions.Item label='Eye Color'>
                {user.eyeColor}
              </Descriptions.Item>

              <Descriptions.Item label='Hair'>
                {user.hair.color} / {user.hair.type}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title='Address'>
            <Descriptions column={1} bordered size='small'>
              <Descriptions.Item label='Address'>
                {user.address.address}
              </Descriptions.Item>

              <Descriptions.Item label='City'>
                {user.address.city}
              </Descriptions.Item>

              <Descriptions.Item label='State'>
                {user.address.state}
              </Descriptions.Item>

              <Descriptions.Item label='Postal Code'>
                {user.address.postalCode}
              </Descriptions.Item>

              <Descriptions.Item label='Country'>
                {user.address.country}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title='Company'>
            <Descriptions column={1} bordered size='small'>
              <Descriptions.Item label='Company'>
                {user.company.name}
              </Descriptions.Item>

              <Descriptions.Item label='Department'>
                {user.company.department}
              </Descriptions.Item>

              <Descriptions.Item label='Title'>
                {user.company.title}
              </Descriptions.Item>

              <Descriptions.Item label='University'>
                {user.university}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title='Bank & Crypto'>
            <Descriptions column={1} bordered size='small'>
              <Descriptions.Item label='Card Type'>
                {user.bank.cardType}
              </Descriptions.Item>

              <Descriptions.Item label='Card Number'>
                {user.bank.cardNumber}
              </Descriptions.Item>

              <Descriptions.Item label='Currency'>
                {user.bank.currency}
              </Descriptions.Item>

              <Descriptions.Item label='IBAN'>
                {user.bank.iban}
              </Descriptions.Item>

              <Descriptions.Item label='Crypto Coin'>
                {user.crypto.coin}
              </Descriptions.Item>

              <Descriptions.Item label='Wallet'>
                {user.crypto.wallet}
              </Descriptions.Item>

              <Descriptions.Item label='Network'>
                {user.crypto.network}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>

      <Divider />

      <Card title='Technical Information'>
        <Descriptions
          bordered
          column={{
            xs: 1,
            md: 2,
          }}
        >
          <Descriptions.Item label='IP'>{user.ip}</Descriptions.Item>

          <Descriptions.Item label='MAC Address'>
            {user.macAddress}
          </Descriptions.Item>

          <Descriptions.Item label='EIN'>{user.ein}</Descriptions.Item>

          <Descriptions.Item label='SSN'>{user.ssn}</Descriptions.Item>

          <Descriptions.Item label='User Agent'>
            {user.userAgent}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </Flex>
  );
};
