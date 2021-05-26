import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InfoMessage from "@/components/InfoMessage";
import ErrorMessage from "@/components/ErrorMessage.js";
import ImageGrid from "@/components/ImageGrid";
import {
  getImages,
  getVotes,
  getFavourites,
} from "@/services/CAT_API.js";

const Home = (props) => {
  const [data, setData] = useState(null);
  const [votes, setVotes] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let params = { limit: 20, page: 0, order: "Desc" };
    getImages(params)
      .then((response) => {
        setData(response);
        setIsLoaded(true);
      })
      .catch((error) => {
        setIsError(true);
      });
  }, []);

  useEffect(() => {
    getVotes()
      .then((response) => {
        setVotes(response);
      })
      .catch((error) => {
        // fail silently
      });
  }, []);

  useEffect(() => {
    getFavourites()
      .then((response) => {
        setFavourites(response);
      })
      .catch((error) => {
        // fail silently
      });
  }, []);

  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-lg leading-6 font-semibold text-gray-900">
            Welcome to Catastrophic!
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          {isError && (
            <ErrorMessage>
              <p className="text-sm text-red-700">
                Looks like the API is down , you could
                <a href={"/"} className="font-medium underline text-red-700">
                  {" "}
                  try again.
                </a>
              </p>
            </ErrorMessage>
          )}
          {isLoaded && data && !data.length && (
            <InfoMessage>
              <p className="text-sm text-blue-700">
                You haven't uploaded any images yet.{" "}
                <Link
                  to={"/upload"}
                  className="font-medium underline text-blue-700 hover:text-blue-800"
                >
                  Upload one now.
                </Link>
              </p>
            </InfoMessage>
          )}
          {data && <ImageGrid data={data} votes={votes} favourites={favourites} />}
        </div>
      </main>
    </>
  );
};
export default Home;
