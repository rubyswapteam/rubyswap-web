import { SearchIcon } from '@heroicons/react/solid';

export default function NavbarSearchInput() {
  return (
    <div className="flex-1 flex items-center justify-center px-2 lg:justify-end">
      <div className="max-w-lg w-full lg:max-w-xs">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            id="search"
            name="search"
            className="block w-full pl-10 pr-3 py-2 rounded-xl border-2 p-0.5 h-10 border-gray-300 leading-5 bg-white
            placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#BD0B00]
            focus:border-[#BD0B00] sm:text-sm"
            placeholder="Search collection, contracts and wallets"
            type="search"
          />
        </div>
      </div>
    </div>
  );
}
