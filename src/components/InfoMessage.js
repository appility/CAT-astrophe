import { InformationCircleIcon } from '@heroicons/react/solid'

export default function InfoMessage(props) {
  return (
    <div className="rounded-md bg-blue-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          {props.children}
        </div>
      </div>
    </div>
  )
}
