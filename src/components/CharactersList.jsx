/* eslint-disable react/prop-types */
import DataLoader from "./DataLoader";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

function CharactersList({
  Characters,
  isLoading,
  onSelectCharacter,
  selectedId,
}) {
  if (Characters.length < 1) {
    return (
      <div className="  xl:mr-[10px] lg:mr-[8px] flex items-center justify-center h-[555px] mt-2 bg-white rounded-[12px] basis-[37%] min-w-[320px]  w-full ">
        <div className=" flex items-center justify-center w-full  flex-col ">
          <h1 className=" font-bold text-[22px] text-blue-900 ">
            Ups!... no results found!
          </h1>
          <br />
          <p className=" font-medium text-[16px] text-gray-800 ">
            Please try another search . . .
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="  basis-[37%] w-full flex items-center justify-center flex-col p-2 gap-y-3 ">
      {isLoading ? (
        <div className=" flex items-center justify-center h-[555px] bg-white rounded-[12px] min-w-[320px]  w-full ">
          <DataLoader />
        </div>
      ) : (
        Characters.map((character) => (
          <Character
            selectedId={selectedId}
            key={character.id}
            character={character}
            onSelectCharacter={onSelectCharacter}
          />
        ))
      )}
    </div>
  );
}

export default CharactersList;

function Character({ character, onSelectCharacter, selectedId }) {
  return (
    <div className="  flex items-center justify-between xl:py-2.5 lg:py-2.5 xl:pr-[18px] lg:pr-4.5 2xl:pl-4 xl:pl-3.5 lg:pl-3 bg-white rounded-[12px] min-w-[320px]  w-full ">
      <div className="  flex items-center justify-start 2xl:gap-x-5 xl:gap-x-[18px] gap-x-5 ">
        <img
          className=" 2xl:w-[84px] xl:w-[82px] lg:w-[79px]  rounded-lg "
          src={character.image}
          alt="character photo"
        />
        <CharacterInfo character={character} />
      </div>
      <button onClick={() => onSelectCharacter(character.id)}>
        {selectedId == character.id ? (
          <EyeSlashIcon className=" 2xl:size-6 xl:size-[22px] lg:size-[22px] cursor-pointer " />
        ) : (
          <EyeIcon className=" 2xl:size-6 xl:size-[22px] lg:size-[22px] cursor-pointer " />
        )}
      </button>
    </div>
  );
}

function CharacterInfo({ character }) {
  return (
    <div className=" flex flex-col xl:gap-y-2 lg:gap-y-1.5 ">
      <h3 className="  text-zinc-950 2xl:text-[18px] xl:text-[17.5px] font-semibold ">
        {character.name}
      </h3>
      <p className=" flex items-center text-zinc-600 2xl:text-base xl:text-[15px] font-[500] ">
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
