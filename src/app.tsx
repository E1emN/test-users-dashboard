import { useRoutes } from 'react-router-dom';
import { UsersPage } from './pages/users';
import { ConfigProvider, Layout } from 'antd';
import { useEffect } from 'react';
import { getTheme } from './assets/ant-theme/ant-theme';
import { useGate, useUnit } from 'effector-react';
import { appGate } from './model/main';
import { $theme, themeReceivedFromStorage, type Theme } from './model/theme';
import { UserPage } from './pages/user';
import { NotFoundPage } from './pages/not-found';

export const App = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <UsersPage />,
    },
    {
      path: '/user/:id',
      element: <UserPage />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);

  useGate(appGate);
  const theme = useUnit($theme);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handler = (event: StorageEvent) => {
      if (event.key === 'theme' && event.newValue) {
        themeReceivedFromStorage(event.newValue as Theme);
      }
    };

    window.addEventListener('storage', handler);

    return () => {
      window.removeEventListener('storage', handler);
    };
  }, []);

  return (
    <ConfigProvider theme={getTheme(theme)}>
      <Layout>{routes}</Layout>
    </ConfigProvider>
  );
};
