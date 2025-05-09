/* eslint-disable react/prop-types */

import { HeartIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import FavModal from "./FavModal";
import ThemeSwitch from "./ThemeSwitch";

function Navbar({ query, setQuery, favorites, onHandleRemove }) {
  return (
    // size for bigger than  **XS**
    <div className=" w-full  ">
      <div className="  xx:hidden xs:flex items-center lg:justify-around xs:justify-between  duration-500  w-full 2xl:py-3.5 xl:py-[13px] lg:py-3 md:py-3 sm:py-3 xs:py-3  xl:mt-6 lg:mt-3.5 sm:mt-0 xs:mt-0  bg-white dark:bg-dk/100 lg:rounded-xl  md:px-12 sm:px-10 xs:px-5 flex-wrap  ">
        <h2 className=" bg-gradient-to-r from-gray-900 via-gray-700 to-gray-600  dark:bg-gradient-to-r dark:from-gray-100 dark:via-gray-200 dark:to-gray-400    logo-xs:block xs:hidden font-bold  2xl:text-[26px] xl:text-[24px] lg:text-[22px] md:text-[21px] sm:text-[21px] xs:text-[20px] my-0 dark:bg-white bg-[#202329]  inline-block text-transparent bg-clip-text  ">
          Rick-Morty Movie
        </h2>
        <img
          src="./assets/logo.png"
          className="  rounded-full logo-xs:hidden xs:block xs:size-10  "
          alt="logo"
        />
        <Search query={query} setQuery={setQuery} />
        <div className="  flex items-center justify-center  gap-x-3 ">
          <FavoriteCharacters
            favorites={favorites}
            onHandleRemove={onHandleRemove}
          />
          <ThemeSwitch />
        </div>
      </div>

      <div className="  xs:hidden xx:flex items-center lg:justify-around xx:justify-between xx:gap-y-5 duration-500  w-full  xx:py-2.5 xx:mt-0  bg-white dark:bg-dk  xx:px-4 flex-wrap  ">
        <div className=" w-full flex items-center justify-between pt-2 ">
          <h2 className=" logo-xs:block xs:hidden font-bold xx:text-[20px] my-0 dark:bg-white bg-[#202329]  inline-block text-transparent bg-clip-text  ">
            Rick-Morty Movie
          </h2>
          <div className="  flex items-center justify-center  gap-x-3 ">
            <FavoriteCharacters
              favorites={favorites}
              onHandleRemove={onHandleRemove}
            />
            <ThemeSwitch />
          </div>
        </div>
        <div className="  w-full flex items-center justify-between  py-1">
          <Search query={query} setQuery={setQuery} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;

function Search({ query, setQuery }) {
  return (
    <div
      id="search"
      className=" flex items-center xs:justify-around xx:justify-center  w-full xs:basis-[27%] xl:px-2 lg:px-3 md:px-2 sm:px-2.5 xs:px-2 xx:px-3 xl:py-3  lg:py-2.5 md:py-2 sm:py-[7px] xs:py-1.5 xx:py-2 border-[1px] border-stone-200 dark:border-stone-900 bg-gray-100/90 focus: dark:bg-gray-900 dark:text-slate-300  xs:rounded-xl xx:rounded-lg  lg:max-w-lg xl:max-w-xl 2xl:max-w-xl  "
    >
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Serach New Character..."
        type="text"
        className=" xx:w-96 xs:w-auto 2xl:pl-0 xl:pl-2 md:pl-1 sm:pl-2 xs:pl-1.5 xx:pl-1 lg:mr-2 2xl:text-[15px] lg:text-[14.5px] md:text-[14px] sm:text-[13.5px] xs:text-[13.5px] xx:text-[13.5px] border-none placeholder-zinc-500 dark:placeholder-gray-300 dark:text-white bg-transparent border-1 border-white   outline-none font-normal text-zinc-900 "
      />
      <SearchIcon query={query} setQuery={setQuery} />
    </div>
  );
}

function FavoriteCharacters({ favorites, onHandleRemove }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <FavModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        favorites={favorites}
        onHandleRemove={onHandleRemove}
      />
      <button className=" relative " onClick={() => setIsOpen(!isOpen)}>
        <span className="  absolute -top-1 -right-1 p-y-0.5 px-1 text-red-50 bg-red-600 xl:text-[12px] lg:text-[12px] md:text-[11px] sm:text-[11px] xs:text-[11px] xx:text-[10px] rounded-full ">
          {favorites.length}
        </span>
        <HeartIcon className=" 2xl:size-8 xl:size-[30px] lg:size-7 md:size-7 sm:size-[26px] xs:size-[25px] xx:size-6 stroke-red-500 z-10 cursor-pointer" />
      </button>
    </>
  );
}

function SearchIcon({ query, setQuery }) {
  if (query.length > 0) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className=" size-7 2xl:scale-[85%]  lg:scale-[90%] md:scale-[87%] sm:scale-[80%] xs:scale-[75%] xx:scale-[75%] mx-2 stroke-gray-600 dark:stroke-gray-300 cursor-pointer"
        onClick={() => setQuery("")}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    );
  }

  return (
    <svg
      className="  xs:mx-2 xx:basis-14 xs:basis-7  stroke-black dark:stroke-gray-300 size-7 2xl:scale-[85%] xl:scale-[83%] lg:scale-[80%] md:scale-[75%] sm:scale-[74%] xx:scale-[75%] cursor-pointer  "
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.4167 24.5002c6.1211 0 11.0833-4.9622 11.0833-11.0834 0-6.12113-4.9622-11.0833-11.0833-11.0833-6.12118 0-11.08336 4.96217-11.08336 11.0833 0 6.1212 4.96218 11.0834 11.08336 11.0834ZM25.6667 25.6668l-2.3334-2.3333"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
