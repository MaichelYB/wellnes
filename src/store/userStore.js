import { extendObservable } from "mobx";

/**
 * user store
 */
class UserStore{
  constructor(){
    extendObservable(this, {
      loading: true,
      isLoggedIn: false,
      username: '',
      events: [],
      is_hr: 0
    })
  }
}

export default new UserStore();