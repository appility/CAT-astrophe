import { Fragment } from 'react'
import {
  NavLink
} from "react-router-dom";
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import CatLogo from '@/components/CatLogo'

const navigation = [
{ label:'Home',
  path: '/'
},
{ label:'Upload',
  path: '/upload'
}
]

export default function Default(props) {
  return (
    <div>
      <Disclosure as="nav" className="bg-indigo-600">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-10">
                      <CatLogo />
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item, itemIdx) =>
                          <Fragment key={`desktop-nav-${itemIdx}`}>
                          <NavLink
                            key={`desktop-nav-item-${itemIdx}`}
                            to={item.path}
                            exact={true}
                            className="text-white hover:bg-indigo-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium"
                            activeClassName="bg-indigo-700 text-white"
                          >
                            {item.label}
                          </NavLink>
                        </Fragment>
                      )}
                    </div>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-indigo-600 inline-flex items-center justify-center p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item, itemIdx) =>
                    <Fragment key={item.label}>
                      {/* Current: "bg-indigo-700 text-white", Default: "text-white hover:bg-indigo-500 hover:bg-opacity-75" */}
                       <NavLink
                            key={`desktop-nav-item-${itemIdx}`}
                            to={item.path}
                            exact={true} 
                            className="hover:bg-indigo-500 hover:bg-opacity-75 text-white block px-3 py-2 rounded-md text-base font-medium"
                            activeClassName="bg-indigo-700 text-white">
                            {item.label}
                            </NavLink>
                    </Fragment>
                )}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
          { props.children }
    </div>
  )
}
