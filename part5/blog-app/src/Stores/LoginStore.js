// NOTE: this is not an actual store since we're only exporting atoms
// Jotai provides a "provider-less" mode which allows us
//  to use atoms across the app even without a Provider and stores
// import { createStore } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

// const LoginStore = createStore()

const loginStatus = atomWithStorage('loginStatus', false);

// LoginStore.set

export default { loginStatus };
