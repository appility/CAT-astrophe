import { XCircleIcon } from '@heroicons/react/solid'

export default function ErrorMessage(props) {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">Oops, something went wrong</h3>
          <div className="mt-2 text-sm text-red-700">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  )
}