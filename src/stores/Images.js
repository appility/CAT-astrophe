const localStorageKey = 'catastrophic_images'

const Images = {
  save: function(data) {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
  },

  get: function() {
    let retrieved = localStorage.getItem(localStorageKey)
    return JSON.parse(retrieved)
  },

  clear: function() {
    localStorage.removeItem(localStorageKey);
  }
}

export default Images
