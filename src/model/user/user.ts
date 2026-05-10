import { createDomain, sample } from 'effector';
import { createGate } from 'effector-react';
import type { User } from './types';
import axios from 'axios';

const userDomain = createDomain();
export const userPageGate = createGate<string>();

export const $user = userDomain.createStore<User | null>(null);
const getUserFx = userDomain.createEffect<string, User>(async (id) => {
  const user = await axios.get<User>(`https://dummyjson.com/users/${id}`);
  return user.data;
});

export const $isUserLoading = userDomain.createStore(false);

$user.on(getUserFx.doneData, (_, user) => user);

$isUserLoading.on(getUserFx, () => true).on(getUserFx.finally, () => false);

sample({
  clock: userPageGate.open,
  target: getUserFx,
});
