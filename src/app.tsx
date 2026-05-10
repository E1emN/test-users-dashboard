import { useRoutes } from 'react-router-dom';
import { UsersPage } from './pages/users';
import { ConfigProvider, Layout } from 'antd';
import { useEffect } from 'react';
import { getTheme } from './assets/ant-theme/ant-theme';
import { useGate, useUnit } from 'effector-react';
import { appGate } from './model/main';
import { $theme } from './model/theme';

export const App = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <UsersPage />,
    },
  ]);

  useGate(appGate);
  const theme = useUnit($theme);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ConfigProvider theme={getTheme(theme)}>
      <Layout>{routes}</Layout>
    </ConfigProvider>
  );
};
