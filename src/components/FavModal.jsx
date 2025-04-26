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

      <div className=" xl:scale-100 xx:scale-[0.87]  bg-white  p-7 rounded-2xl max-w-[440px]  z-50 w-full ">
        <div className="flex items-center justify-between my-1 ">
          <h2 className="text-gray-900  text-center text-2xl font-bold">
            Favorite Characters
          </h2>
          <XMarkIcon
            onClick={() => setIsOpen(!isOpen)}
            className=" size-7 stroke-red-700 cursor-pointer stroke-3 "
          />
        </div>
        <div className=" bg-gray-200 h-0.5 w-full my-4 "></div>
        {favorites.length < 1 ? (
          <div className=" w-full flex justify-center my-2 h-24 items-center " >
            <h1 className=" font-semibold text-xl text-gray-700 " >Favorites characters list is empty!</h1>
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
    <div className="  flex items-center justify-between py-3 pr-5 pl-4 border-2 border-gray-200 mt-3 rounded-[12px]   w-full ">
      <div className="  flex items-center justify-start gap-x-5 ">
        <img
          className=" w-[77px] rounded-lg "
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
    <div className=" flex flex-col gap-y-2 ">
      <h3 className="  text-zinc-950 text-[18px] font-semibold ">
        {character.name}
      </h3>
      <p className=" flex items-center text-zinc-700 text-base font-meduim ">
        <span
          className={`  ${
            character.status == "Alive" ? "bg-green-500" : "bg-red-500"
          }  size-2 mr-2 rounded-full inline-block   `}
        ></span>
        {character.status} - {character.species}
      </p>
    </div>
  );
}
