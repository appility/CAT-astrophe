import { useState, useEffect } from "react";
import classNames from "classnames";
import { HeartIcon } from "@heroicons/react/solid";
import Favourites from "@/stores/Favourites";
import User from "@/stores/User";
import {
  addImageToFavourites,
  removeImageFromFavourites,
} from "@/services/CAT_API.js";

export default function Favourite(props) {
  const [favouriteId, setFavouriteId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const CurrentUser = User.get();
  useEffect(() => {
    const setInitialValues = () => {
      setFavouriteId(returnInitialValue());
    };
    const returnInitialValue = () => {
      let { id } = props;
      let favourite = Favourites.getByImageID(id);
      return favourite && favourite.id ? favourite.id : null;
    };
    setInitialValues();
  }, [props]);

  const handleClick = () => {
    if (isSaving) return;
    setIsSaving(true);
    if (favouriteId) {
      handleRemoveImageFromFavourites();
    } else {
      handleAddImageToFavourites();
    }
  };

  const handleAddImageToFavourites = (image_id) => {
    setFavouriteId(1);
    let params = {
      image_id: props.id,
      sub_id: CurrentUser.uuid,
    };
    addImageToFavourites(params).then((response) => {
      if (response.message === "SUCCESS") {
        let { id } = response;
        Favourites.add(id, props.id);
        setFavouriteId(id);
      }
      setIsSaving(false);
    });
  };

  const handleRemoveImageFromFavourites = () => {
    if (!favouriteId) return;
    setFavouriteId(null);
    removeImageFromFavourites(favouriteId).then((response) => {
      if (response.message === "SUCCESS") {
        Favourites.removeByImageID(props.id);
        setFavouriteId(null);
      }
      setIsSaving(false);
    });
  };

  const btnClass = classNames({
    "text-red-500": favouriteId,
  });

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isSaving}
      className={`${btnClass} w-12 h-12 items-center p-1 border border-transparent rounded-full shadow-sm text-base sm:text-small md:text-base bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
    >
      <HeartIcon />
    </button>
  );
}
