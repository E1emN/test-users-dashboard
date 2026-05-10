import { Header } from '@/components/header/header';
import { UserDetails } from '@/components/user-details/user-details';
import { userPageGate } from '@/model/user/user';
import { Flex } from 'antd';
import { useGate } from 'effector-react';
import { useParams } from 'react-router-dom';

export const UserPage = () => {
  const { id } = useParams();
  useGate(userPageGate, id);

  return (
    <Flex vertical gap={40}>
      <Header />
      <UserDetails />
    </Flex>
  );
};
