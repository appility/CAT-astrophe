import { v4 as uuidv4 } from 'uuid';

const localStorageKey = 'catastrophic_user'

const User = {
  create: function() {
    let retrieved = localStorage.getItem(localStorageKey)
    if (!retrieved) {
      let user = {
        uuid: uuidv4()
      }
      localStorage.setItem(localStorageKey, JSON.stringify(user));
    }
  },
  get: function() {
    let retrieved = localStorage.getItem(localStorageKey)
    return retrieved ? JSON.parse(retrieved) : null
  },

  getUUID: function() {
    let retrieved = localStorage.getItem(localStorageKey)
    return retrieved ? JSON.parse(retrieved)['uuid'] : null
  },

  clear: function() {
    let retrieved = localStorage.getItem(localStorageKey)
    if (retrieved) {
      localStorage.removeItem(localStorageKey);
    }
  }
}

export default User
