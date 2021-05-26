const localStorageKey = "catastrophic_votes";

const Votes = {
  save: function (data) {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
  },

  get: function () {
    let retrieved = localStorage.getItem(localStorageKey);
    return JSON.parse(retrieved);
  },

  addVote: function (vote) {
    let stored = localStorage.getItem(localStorageKey);
    let votes = JSON.parse(stored);
    if (votes) {
      let toStore = [...votes, vote];
      localStorage.setItem(localStorageKey, JSON.stringify(toStore));
    }
  },

  returnVotesByImageId: function (image_id) {
    let stored = localStorage.getItem(localStorageKey);
    let votes = JSON.parse(stored);
    if (!votes) return null
    var result = votes
      .filter(function (vote) {
        return vote.image_id === image_id;
      })
      .reduce(function (count, vote) {
        return count + ( vote.value === 1 ? 1 : -1);
      }, 0);
    return result;
  },

  hasVotedByImageId: function (image_id, user_id) {
    let stored = localStorage.getItem(localStorageKey);
    let votes = JSON.parse(stored);
    if (!votes) return null
    var result = votes
      .filter(function (vote) {
        return vote.image_id === image_id;
      })
      .filter(function (vote) {
        return vote.sub_id === user_id;
      })
    return result;
  },

  clear: function () {
    localStorage.removeItem(localStorageKey);
  },
};

export default Votes;
