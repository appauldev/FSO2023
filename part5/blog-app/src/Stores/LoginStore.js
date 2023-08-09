import { atomWithStorage } from 'jotai/utils';

const loginStatus = atomWithStorage('loginStatus', false);

export default { loginStatus };
