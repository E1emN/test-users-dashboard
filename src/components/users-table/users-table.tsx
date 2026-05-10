import {
  $usersPagination,
  $usersData,
  type User,
  tableChanged,
  $isLoading,
} from '@/model/user';
import { Avatar, Flex, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useUnit } from 'effector-react';

export const UsersTable = () => {
  const usersData = useUnit($usersData);
  const pagination = useUnit($usersPagination);
  const isLoading = useUnit($isLoading);

  const columns: ColumnsType<User> = [
    {
      title: 'Avatar',
      dataIndex: 'image',
      key: 'image',
      width: 80,
      render: (image: string, user) => (
        <Avatar src={image} alt={user.firstName} />
      ),
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email: string) => <a href={`mailto:${email}`}>{email}</a>,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: 100,
      sorter: true,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      render: (gender: string) => (
        <Tag color={gender === 'male' ? 'blue' : 'magenta'}>{gender}</Tag>
      ),
      sorter: true,
    },
    {
      title: 'Company',
      key: 'company',
      render: (_, user) => user.company.name,
    },
    {
      title: 'Department',
      key: 'department',
      render: (_, user) => user.company.department,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => <Tag>{role}</Tag>,
      sorter: true,
    },
  ];

  return (
    <Flex className='container'>
      <Table
        dataSource={usersData?.users}
        columns={columns}
        loading={isLoading}
        rowKey='id'
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: usersData?.total,
        }}
        onChange={(pagination, _, sorter) => {
          tableChanged({
            pagination: {
              current: pagination.current ?? 1,
              pageSize: pagination.pageSize ?? 10,
            },
            sorting: Array.isArray(sorter)
              ? {
                  sortBy: null,
                  order: null,
                }
              : {
                  sortBy: (sorter.field as keyof User) ?? null,
                  order:
                    sorter.order === 'ascend'
                      ? 'asc'
                      : sorter.order === 'descend'
                        ? 'desc'
                        : null,
                },
          });
        }}
      />
    </Flex>
  );
};
