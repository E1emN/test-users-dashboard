import { Flex, Typography } from 'antd';
import './header.scss';
import { useUnit } from 'effector-react';
import { $theme, themeChanged } from '@/model/theme';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export const Header = () => {
  const theme = useUnit($theme);

  const handleThemeChange = () => {
    themeChanged();
  };

  return (
    <Flex className='header' align='center' justify='space-between'>
      <Link to='/'>
        <Typography.Title level={2}>Users Dashboard</Typography.Title>
      </Link>
      {theme === 'light' ? (
        <MoonOutlined onClick={handleThemeChange} />
      ) : (
        <SunOutlined onClick={handleThemeChange} />
      )}
    </Flex>
  );
};
