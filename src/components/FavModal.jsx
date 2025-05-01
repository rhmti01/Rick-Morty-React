/* eslint-disable react/prop-types */
import { XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import "../App";

function FavModal({ isOpen, setIsOpen, favorites, onHandleRemove }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/70 z110  flex items-center justify-center">
      {/* space out of div */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="  cursor-pointer  inset-0 absolute  w-full h-screen z-50  "
      ></div>

      <div className="   bg-white lg:p-7 md:p-5 sm:p-4 rounded-2xl 2xl:max-w-[440px] xl:max-w-[370px] lg:max-w-[340px] md:max-w-[360px] sm:max-w-[340px] z-50 w-full ">
        <div className="flex items-center justify-between my-1 ">
          <h2 className="text-gray-900  text-center 2xl:text-2xl xl:text-[22px] lg:text-[21px] md:text-[20px] sm:text-[19px] font-bold">
            Favorite Characters
          </h2>
          <XMarkIcon
            onClick={() => setIsOpen(!isOpen)}
            className=" 2xl:size-7 xl:size-[26px] lg:size-6 md:size-5 sm:size-5  stroke-red-700 cursor-pointer stroke-3 "
          />
        </div>
        <div className=" bg-gray-200 h-0.5 w-full 2xl:my-4 xl:my-2.5 md:my-2.5 sm:my-2 "></div>
        {favorites.length < 1 ? (
          <div className=" w-full flex justify-center my-2 2xl:h-24 xl:h-20 lg:h-20 md:h-16 sm:h-14 items-center ">
            <h1 className=" font-semibold 2xl:text-xl xl:text-[18px] lg:text-[17px] md:text-[16.5px] sm:text-[16px] text-gray-700 underline  flex    ">
              Favorites characters list is empty!
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className=" 2xl:size-6 lg:size-5 md:size-5 sm:size-5 lg:mt-[3px] md:mt-[3px] sm:mt-0.5   "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                />
              </svg>
            </h1>
          </div>
        ) : (
          favorites.map((character) => (
            <Character
              key={character.id}
              character={character}
              onHandleRemove={onHandleRemove}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default FavModal;

function Character({ character, onHandleRemove }) {
  return (
    <div className="  flex items-center justify-between lg:py-3 md:py-2 sm:py-1.5 lg:pr-3 md:pr-2.5 sm:pr-2 lg:pl-3 md:pl-2 sm:pl-2 border-2 border-gray-200 mt-3 rounded-[12px]   w-full ">
      <div className="  flex items-center justify-start lg:gap-x-4 md:gap-x-4 sm:gap-x-3.5 ">
        <img
          className=" lg:w-[72px] md:w-[65px] sm:w-[60px] xl:rounded-lg sm:rounded-2xl "
          src={character.image}
          alt="character photo"
        />
        <CharacterInfo character={character} />
      </div>
      <XCircleIcon
        onClick={() => onHandleRemove(character.id)}
        className="size-7 stroke-red-700 cursor-pointer "
      />
    </div>
  );
}

function CharacterInfo({ character }) {
  return (
    <div className=" flex flex-col lg:gap-y-1 md:gap-y-1 sm:gap-y-1 ">
      <h3 className="  text-zinc-950 lg:text-[18px] md:text-base sm:text-base font-semibold ">
        {character.name}
      </h3>
      <p className=" lg:text-base md:text-[15px] sm:text-[15px] flex items-center text-zinc-700 text-base font-meduim ">
        <span
          className={`  ${
            character.status == "Alive" ? "bg-green-500" : "bg-red-500"
          }  size-2 lg:mr-2 sm:mr-1 rounded-full inline-block   `}
        ></span>
        {character.status} - {character.species}
      </p>
    </div>
  );
}
