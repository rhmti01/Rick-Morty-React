/* eslint-disable react/prop-types */

import ThemeSwitch from "./ThemeSwitch";

function Navbar({ query, setQuery }) {
  return (
    <div className="  w-full py-3.5 mt-6 bg-white dark:bg-black rounded-xl flex items-center justify-around flex-wrap  ">
      <h2 className=" font-bold  2xl:text-[26px] xl:text-[24.5px] xg:text-[22px] xx:text-[20px] mm:text-[22px] ss:text-[22px] my-0  bg-[#202329]  inline-block text-transparent bg-clip-text  ">
        Rick-Morty Movie{" "}
      </h2>
      <Search query={query} setQuery={setQuery} />
      <div className=" flex items-center justify-center  gap-x-3 ">
        <FavoriteCharacters />
        <ThemeSwitch />
      </div>
    </div>
  );
}

export default Navbar;

function Search({ query, setQuery }) {
  return (
    <div
      id="search"
      className=" border-[1px] border-stone-200 justify-around bg-gray-100/90 focus: dark:bg-gray-700 dark:text-slate-100 basis-[27%] flex  items-center md:px-1 md:py-2 xl:px-2 xl:py-3 rounded-xl  lg:max-w-lg xl:max-w-xl 2xl:max-w-xl  "
    >
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Serach New Character..."
        type="text"
        className="  border-none placeholder-zinc-500 dark:placeholder-white dark:text-white bg-transparent border-1 border-white  lg:mr-2 outline-none  md:text-xs lg:text-[13px] xl:text-[15px] font-normal text-zinc-900 "
      />
      <svg
        width="28"
        height="28"
        className=" mx-2 stroke-black "
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.4167 24.5002c6.1211 0 11.0833-4.9622 11.0833-11.0834 0-6.12113-4.9622-11.0833-11.0833-11.0833-6.12118 0-11.08336 4.96217-11.08336 11.0833 0 6.1212 4.96218 11.0834 11.08336 11.0834ZM25.6667 25.6668l-2.3334-2.3333"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function FavoriteCharacters() {
  return (
    <div className=" relative ">
      <span className="  absolute -top-1 -right-1 p-y-0.5 px-1 text-red-50 bg-red-600 text-[12px] rounded-full ">
        5
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className=" stroke-red-500 2xl:size-8 lg:size-7.5 md:size-7 sm:size-7 ss:size-6  cursor-pointer"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
    </div>
  );
}
