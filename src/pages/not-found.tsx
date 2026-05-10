import { Header } from '@/components/header/header';
import { NotFound } from '@/components/not-found/not-found';
import { Flex } from 'antd';

export const NotFoundPage = () => {
  return (
    <Flex vertical gap={40}>
      <Header />
      <NotFound />
    </Flex>
  );
};
