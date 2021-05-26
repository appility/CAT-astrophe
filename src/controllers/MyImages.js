import react, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import User from "@/stores/User";
import Votes from "@/stores/Votes";
import InfoMessage from "@/components/InfoMessage";
import ImageGrid from "@/components/ImageGrid";
import API from "@/common/API.js";
import { getVotes, voteForImage } from "@/services/CAT_API.js";

const Home = (props) => {
  const [data, setData] = useState(null);
  const [votes, setVotes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const CurrentUser = User.get();
  useEffect(async () => {
    const result = await API.get(
      "https://api.thecatapi.com/v1/images?limit=16&page=0&order=Desc",
      {
        sub_id: CurrentUser.uuid,
        include_vote: 1,
        include_favourite: 1,
      }
    );
    if (result.status === 200) {
      setData(result.data);
    }
    setIsLoaded(true);
  }, []);

  useEffect(async () => {
    getVotes().then((response) => {
      setVotes(response);
    });
  }, []);

  const handleVote = (image_id, vote) => {
    let value = vote === "UP" ? 1 : 0;
    let params = {
      image_id: image_id,
      value: value,
    };
    voteForImage(params);
  };

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
          {isLoaded && !data.length && (
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
        { data && (
          <ImageGrid data={data} onVote={handleVote} votes={votes}/>
          )}
        </div>
      </main>
    </>
  );
};
export default Home;
