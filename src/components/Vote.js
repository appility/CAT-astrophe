import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/solid";

export default function Vote(props) {
  return (
    <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-2 sm:grid-flow-row-dense">
      <button
        type="button"
        onClick={(e) => {
          props.onVote("DOWN");
        }}
        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm md:px-4 py-2 bg-system-red text-base font-medium text-white hover:bg-system-red focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-coolGray-200 sm:col-start-2 sm:text-sm"
      >
        <span className="relative top-0.5">
          <ArrowDownIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
        </span>
        Vote <span className="md:hidden lg:inline-block">&nbsp;Down</span>
      </button>
      <button
        type="button"
        onClick={(e) => {
          props.onVote("UP");
        }}
        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-system-green text-base font-medium text-white hover:bg-system-green focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-coolGray-200 sm:mt-0 sm:col-start-1 sm:text-sm"
      >
        <span className="relative top-0.5">
          <ArrowUpIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
        </span>
        Vote <span className="md:hidden lg:inline-block">&nbsp;Up!</span>
      </button>
    </div>
  );
}
