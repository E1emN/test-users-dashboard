import { Button, Result, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Flex
      className='container'
      justify='center'
      align='center'
      style={{ minHeight: '100vh' }}
    >
      <Result
        status='404'
        title='404'
        subTitle='Page not found. The page you are looking for does not exist.'
        extra={[
          <Button type='primary' key='home' onClick={() => navigate('/')}>
            Go Home
          </Button>,
          <Button key='back' onClick={() => navigate(-1)}>
            Go Back
          </Button>,
        ]}
      />
    </Flex>
  );
};
