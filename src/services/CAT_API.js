import API from "@/common/API.js";
import User from "@/stores/User";
import Images from "@/stores/Images";
import Votes from "@/stores/Votes";
import Favourites from "@/stores/Favourites";

function returnPromise(data) {
  return new Promise(function (resolve, reject) {
    if (data) {
      resolve(data);
    }
  });
}

export function getImages(params) {
  let cache = Images.get();
  if (cache) {
    return returnPromise(cache);
  }
  return API.get(`${process.env.REACT_APP_CAT_API_ENDPOINT}/images`, params)
    .then((response) => {
      if (!response || response.status !== 200) {
        throw Error();
      }
      let { data } = response;
      Images.save(data);
      return data;
    })
    .catch((error) => {
      throw Error(error);
    });
}

export function getVotes() {
  return API.get(`${process.env.REACT_APP_CAT_API_ENDPOINT}/votes`)
    .then((response) => {
      let { data } = response;
      if (data) {
        Votes.save(data);
        return data;
      }
    })
    .catch((error) => {
      throw Error(error);
    });
}

export function getFavourites() {
  const CurrentUser = User.get();
  if (!CurrentUser) return null;
  let params = { sub_id: CurrentUser.uuid };
  return API.get(`${process.env.REACT_APP_CAT_API_ENDPOINT}/favourites`, params)
    .then((response) => {
      let { data } = response;
      if (data) {
        Favourites.save(data);
        return data;
      }
    })
    .catch((error) => {
      throw Error(error);
    });
}

export function addImageToFavourites(params) {
  return API.post(
    `${process.env.REACT_APP_CAT_API_ENDPOINT}/favourites`,
    params
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw Error(error);
    });
}

export function removeImageFromFavourites(favourite_id) {
  return API.delete(
    `${process.env.REACT_APP_CAT_API_ENDPOINT}/favourites/${favourite_id}`
  )
    .then((response) => {
      let { data } = response;
      return data;
    })
    .catch((error) => {
      throw Error(error);
    });
}

export function voteForImage(params) {
  params["sub_id"] = User.getUUID();
  return API.post(`${process.env.REACT_APP_CAT_API_ENDPOINT}/votes`, params)
    .then((response) => {
      let { id, message } = response;
      if (message === "SUCCESS") {
        let item = {
          id: id,
          image_id: params["image_id"],
          sub_id: params["sub_id"],
          value: params["value"]
        };
        Votes.addVote(item);
      }
      return response;
    })
    .catch((error) => {
      throw Error(error);
    });
}
