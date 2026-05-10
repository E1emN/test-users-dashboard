import { Header } from '@/components/header/header';
import { UsersTable } from '@/components/users-table/users-table';
import { usersPageGate } from '@/model/user';
import { Flex } from 'antd';
import { useGate } from 'effector-react';

export const UsersPage = () => {
  useGate(usersPageGate);

  return (
    <Flex vertical gap={40}>
      <Header />
      <UsersTable />
    </Flex>
  );
};
