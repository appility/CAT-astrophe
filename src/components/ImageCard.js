import { useState, useEffect } from "react";
import User from "@/stores/User";
import Votes from "@/stores/Votes";
import Favourite from "@/components/Favourite";
import Vote from "@/components/Vote";
import {
  voteForImage,
} from "@/services/CAT_API.js";

export default function Card(props) {
  const [voteCount, setVoteCount] = useState(null);
  const [hasVoted, setHasVoted] = useState(null);

  useEffect(() => {
    const setInitialValues = () => {
      setVoteCount(returnInitialValueVoteCount());
      setHasVoted(returnInitialValueHasVoted());
    };
    const returnInitialValueVoteCount = () => {
      let { id } = props;
      let result = Votes.returnVotesByImageId(id);
      return result ? result : 0;
    };
    const returnInitialValueHasVoted = () => {
      let { id } = props;
      let user_id = User.getUUID();
      let result = Votes.hasVotedByImageId(id, user_id);
      return ( result && result.length ) ? true : false;
    };
    setInitialValues();
  }, [props]);

  const handleVote = (vote) => {
    let { id } = props
    let value = vote === "UP" ? 1 : 0;
    let params = {
      image_id: id,
      value: value,
    };
    voteForImage(params)
    updateCount(vote);
  };

  const updateCount = (vote) => {
    let increment = vote === "UP" ? 1 : -1;
    setVoteCount(voteCount+increment)
    setHasVoted(true)
  }

  return (
    <>
      <div className="flex justify-center relative">
        <div className="w-full md:max-w-sm rounded pb-28 md:pb-0">
          <div className="absolute m-4 top-0 right-0 w-12">
            <div className="flex items-center justify-center flex-1 h-full">
              <Favourite {...props} />
            </div>
          </div>
          <div className="absolute mt-2 ml-1 top-0 left-0 w-20">
            <div className="flex items-center justify-center flex-1 h-full">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-300 text-gray-800">
                Votes: {voteCount}
              </span>
            </div>
          </div>
          {props.children}
        </div>
      </div>
      <div className="px-2 py-2 absolute bottom-0 w-full">
        { hasVoted && (
          <div className="bg-gray-50 sm:rounded-lg w-full">
            <p className="mt-2 flex items-center text-sm text-gray-500">
              <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" x-description="Heroicon name: solid/check-circle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Thanks for voting!
            </p>
          </div>
        )}
        { !hasVoted && (
          <Vote id={props.id} onVote={handleVote} />
        )}
      </div>
    </>
  );
}
