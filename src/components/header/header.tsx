import { Flex, Typography } from 'antd';
import './header.scss';
import { useUnit } from 'effector-react';
import { $theme, themeChanged } from '@/model/theme';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';

export const Header = () => {
  const theme = useUnit($theme);

  return (
    <Flex className='header' align='center' justify='space-between'>
      <Typography.Title level={2}>Users Dashboard</Typography.Title>
      {theme === 'light' ? (
        <MoonOutlined onClick={() => themeChanged()} />
      ) : (
        <SunOutlined onClick={() => themeChanged()} />
      )}
    </Flex>
  );
};
