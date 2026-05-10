import { createDomain, sample } from 'effector';
import type { UsersPagination, UsersResponse, UsersSorting } from './types';
import { createGate } from 'effector-react';
import axios from 'axios';

const usersDomain = createDomain();
export const usersPageGate = createGate();

export const $usersPagination = usersDomain.createStore<UsersPagination>({
  current: 1,
  pageSize: 10,
});

export const $usersSorting = usersDomain.createStore<UsersSorting>({
  sortBy: null,
  order: null,
});

export const tableChanged = usersDomain.createEvent<{
  pagination: UsersPagination;
  sorting: UsersSorting;
}>();

export const $usersData = usersDomain.createStore<UsersResponse | null>(null);
export const getUsersFx = usersDomain.createEffect<
  UsersPagination & UsersSorting,
  UsersResponse
>(async ({ current, pageSize, sortBy, order }) => {
  const skip = (current - 1) * pageSize;

  const response = await axios.get<UsersResponse>(
    'https://dummyjson.com/users',
    {
      params: {
        limit: pageSize,
        skip,
        sortBy: sortBy ?? undefined,
        order: order ?? undefined,
      },
    }
  );

  return response.data;
});

export const $isLoading = usersDomain.createStore(false);

$usersPagination
  .on(tableChanged, (_, { pagination }) => ({
    current: pagination.current,
    pageSize: pagination.pageSize,
  }))
  .on(getUsersFx.doneData, (_, payload) => ({
    current: payload.skip / payload.limit + 1,
    pageSize: payload.limit,
    total: payload.total,
  }));

$usersSorting.on(tableChanged, (_, { sorting }) => sorting);

$usersData.on(getUsersFx.doneData, (_, usersData) => usersData);

$isLoading
  .on(getUsersFx, () => true)
  .on(getUsersFx.finally, () => false);

sample({
  clock: usersPageGate.open,
  source: {
    pagination: $usersPagination,
    sorting: $usersSorting,
  },
  fn: ({ pagination, sorting }) => ({
    ...pagination,
    ...sorting,
  }),
  target: getUsersFx,
});

sample({
  clock: tableChanged,
  fn: ({ pagination, sorting }) => ({
    ...pagination,
    ...sorting,
  }),
  target: getUsersFx,
});
