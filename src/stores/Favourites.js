
const localStorageKey = "catastrophic_favourites";

const Favourites = {
  save: function (data) {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
  },

  get: function () {
    let retrieved = localStorage.getItem(localStorageKey);
    return retrieved ? JSON.parse(retrieved) : null;
  },

  getByImageID: function (image_id) {
    let stored = localStorage.getItem(localStorageKey);
    if(!stored) return null
    let favourites = JSON.parse(stored);
    var result = favourites.filter(function (favourite) {
      return favourite.image_id === image_id;
    });
    return result[0] ? result[0] : null;
  },

  add: function (id, image_id) {
    let newItem = {
      id: id, 
      image_id: image_id
    }
    let stored = localStorage.getItem(localStorageKey);
    if(!stored) return null
    let favourites = JSON.parse(stored);
    let toStore = [...favourites, newItem];
    localStorage.setItem(localStorageKey, JSON.stringify(toStore));
  },

  removeByImageID: function (image_id) {
    let stored = localStorage.getItem(localStorageKey);
    let favourites = JSON.parse(stored);
    let toStore  = favourites.filter(function (item) { return item.image_id !== image_id; });
    localStorage.setItem(localStorageKey, JSON.stringify(toStore));
  },

  clear: function () {
    let stored = localStorage.getItem(localStorageKey);
    if (stored) {
      localStorage.removeItem(localStorageKey);
    }
  }
};

export default Favourites;
